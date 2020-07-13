// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps;

import java.util.*;


public final class FindMeetingQuery {
    
  public Collection<TimeRange> query(Collection<Event> events, MeetingRequest request) {

    Collection<String> peopleInMeeting = request.getAttendees();
    List<TimeRange> unavailableTimeList = new ArrayList<TimeRange>();
    //loop through all events happening
    for (Event event: events) {
        Collection<String> conflictEvent = event.getAttendees();
        //add times of events where people needed in my event are
        if (isPersonInMeeting(peopleInMeeting, conflictEvent)){
            unavailableTimeList.add(event.getWhen());
        }
    }

    Collections.sort(unavailableTimeList, TimeRange.ORDER_BY_START);
    Collection<TimeRange> availableTimeList = new ArrayList<TimeRange>();
    int meetingTime=0;
    long meetingLength= request.getDuration();
    TimeRange available;
    for(TimeRange time : unavailableTimeList) {
        int cannotStart = time.start();
        int cannotEnd = time.end();
        if (meetingTime + meetingLength <= cannotStart) {
            available = TimeRange.fromStartEnd(meetingTime, cannotStart, false);
            availableTimeList.add(available);
        }
     meetingTime = Math.max(cannotEnd, meetingTime); 
    }
// minutes in a day
    if (meetingTime + meetingLength <= 1440){
      TimeRange isValidTimeRange = TimeRange.fromStartEnd(meetingTime, 1440, false);
      availableTimeList.add(isValidTimeRange);
    }

    return availableTimeList;
           
      

  }

  private boolean isPersonInMeeting(Collection<String> peopleInMeeting, Collection<String> conflictEvent) {
     for(String person: peopleInMeeting) {
         if (conflictEvent.contains(person)){
             return true;
         }
     }
    return false;
}
}