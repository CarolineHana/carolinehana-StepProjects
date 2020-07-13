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
import java.util.ArrayList;
import java.util.Arrays;


public final class FindMeetingQuery {
    
  public Collection<TimeRange> query(Collection<Event> events, MeetingRequest request) {
    Collection<String> meetingAttendees = request.getAttendees();

// conditionals for empty events and too long time durations
    if(meetingAttendees.isEmpty() && events.isEmpty()){
        return Arrays.asList(TimeRange.WHOLE_DAY);
    }

    if(request.getDuration() == TimeRange.WHOLE_DAY.duration()+1){
        return Arrays.asList();
    }

    List<TimeRange> unavailableTimeList = new ArrayList<TimeRange>();
    
    //loop through all events happening
    for (Event event: events) {
         Collection<String> scheduledEvent = event.getAttendees();
        //add times of events where people are busy
        for(String person: meetingAttendees) {
         if (scheduledEvent.contains(person)){
            unavailableTimeList.add(event.getWhen());
        }
      }
    }

    Collections.sort(unavailableTimeList, TimeRange.ORDER_BY_START);
    Collection<TimeRange> availableTimeList = new ArrayList<TimeRange>();
    int meetingTime=0;
    long meetingLength= request.getDuration();
    TimeRange available;

    for(TimeRange scheduledmeeting : unavailableTimeList) {
        int cannotStart = scheduledmeeting.start();
        int cannotEnd = scheduledmeeting.end();
        if (meetingTime + meetingLength <= cannotStart) {
            available = TimeRange.fromStartEnd(meetingTime, cannotStart, false);
            availableTimeList.add(available);
        }
     meetingTime = Math.max(cannotEnd, meetingTime); 
    }
// minutes in a whole day
    if (meetingTime + meetingLength <= 1440){
      TimeRange isValidTimeRange = TimeRange.fromStartEnd(meetingTime, 1440, false);
      availableTimeList.add(isValidTimeRange);
    }

    return availableTimeList;   

  }
}