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

package com.google.sps.servlets;

import com.google.sps.data.Comment;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.gson.Gson;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Servlet that returns some example content. TODO: modify this file to handle comments data */
@WebServlet("/data")
public class DataServlet extends HttpServlet {

    @Override
  public void doGet (HttpServletRequest request, HttpServletResponse response) throws IOException {
    Query query = new Query("Comment").addSort("time", SortDirection.DESCENDING);
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    PreparedQuery results = datastore.prepare(query);
    

    List<Comment> comments = new ArrayList<>();

    int showAmount;
    try {
      showAmount = Integer.parseInt(request.getParameter("showAmount"));
    } catch (NumberFormatException e) {
      showAmount = -1;
    }

    int counter =0;
    for (Entity entity : results.asIterable()) {
      if (showAmount == 0) break; 
      long id = entity.getKey().getId();
      String userName = (String) entity.getProperty("userName");
      String text = (String) entity.getProperty("text");
      String time = (String) entity.getProperty("time");
      Comment comment = new Comment(id, userName, text, time);

      comments.add(comment);
      counter++;
      showAmount--; 
    }

     if (showAmount == -1) {
           comments= comments.subList(0,counter);
        }

    // convert to JSON
    Gson gson = new Gson();
    // Send the JSON as the response
    response.setContentType("application/json;");
    response.getWriter().println(gson.toJson(comments));
   
  }

  @Override
   public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    // Get the input from the form.
     String userName = request.getParameter("name-input");
     String text = request.getParameter("text-input");

    LocalDateTime myDateObj = LocalDateTime.now();
    DateTimeFormatter myFormatObj = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");
    String time = myDateObj.format(myFormatObj);

    Entity commentEntity = new Entity("Comment");
        commentEntity.setProperty("userName", userName);
        commentEntity.setProperty("text", text);
        commentEntity.setProperty("time", time);
        DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
        datastore.put(commentEntity);



      response.sendRedirect("/main_ENG.html");
      

   }
}

