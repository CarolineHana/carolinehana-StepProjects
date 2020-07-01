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

    private static class Comment {
        long id;
        String text;
        long timestamp;

    public Comment(long id, String text, long timestamp) {
      this.id = id;
      this.text = text;
      this.timestamp = timestamp;
        }
    }

    @Override
  public void doGet (HttpServletRequest request, HttpServletResponse response) throws IOException {
       Query query = new Query("Comment").addSort("timestamp", SortDirection.DESCENDING);

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    PreparedQuery results = datastore.prepare(query);
    
    ArrayList<Comment> comments = new ArrayList<>();

    for (Entity entity : results.asIterable()) {
      long id = entity.getKey().getId();
      String text = (String) entity.getProperty("comment");
      long timestamp = (long) entity.getProperty("time");
      

      Comment comment = new Comment(id, text, timestamp);
      comments.add(comment);
     
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
    String comment = getUserComment(request, "text-input", "");
    LocalDateTime myDateObj = LocalDateTime.now();
    DateTimeFormatter myFormatObj = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");
    String time = myDateObj.format(myFormatObj);

    Entity CommentEntity = new Entity("Comment");
    CommentEntity.setProperty("comment", comment);
    CommentEntity.setProperty("time", time);

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    datastore.put(CommentEntity);

    response.sendRedirect("/main_ENG.html");

   }


  private String getUserComment(HttpServletRequest request, String name, String DefaultValue) {
    String text = request.getParameter(name);
    
    if (text == null) {
      return DefaultValue;
    }
    return text;
    }
  }


