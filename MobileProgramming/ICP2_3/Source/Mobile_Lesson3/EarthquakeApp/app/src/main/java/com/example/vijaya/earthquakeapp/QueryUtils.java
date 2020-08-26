package com.example.vijaya.earthquakeapp;

import android.util.Log;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

public class QueryUtils {
    /**
     * Tag for the log messages
     */
    private static final String LOG_TAG = QueryUtils.class.getSimpleName();

    /**
     * Create a private constructor because no one should ever create a {@link QueryUtils} object.
     * This class is only meant to hold static variables and methods, which can be accessed
     * directly from the class name QueryUtils (and an object instance of QueryUtils is not needed).
     */
    private QueryUtils() {
    }

    /**
     * Query the USGS dataset and return a list of {@link Earthquake} objects.
     */
    public static List<Earthquake> fetchEarthquakeData2(String requestUrl) {
        // An empty ArrayList that we can start adding earthquakes to
        final List<Earthquake> earthquakes = new ArrayList<>();
        //  URL object to store the url for a given string
        URL url = null;
        // A string to store the response obtained from rest call in the form of string
        String jsonResponse = "";
        try {
            //TODO: 1. Create a URL from the requestUrl string and make a GET request to it
            //TODO: 2. Read from the Url Connection and store it as a string(jsonResponse)
                /*TODO: 3. Parse the jsonResponse string obtained in step 2 above into JSONObject to extract the values of
                        "mag","place","time","url"for every earth quake and create corresponding Earthquake objects with them
                        Add each earthquake object to the list(earthquakes) and return it.
                */
            OkHttpClient client = new OkHttpClient();
            Request request = new Request.Builder()
                    .url(requestUrl)
                    .build();


                    try {
                        Response response=client.newCall(request).execute();
                        final JSONObject jsonResult;

                        final String result = response.body().string();
                        JSONObject js;
                        JSONArray features;
                        JSONArray items;
                    js = new JSONObject(result.toString());
                        items=js.getJSONArray("features");
                        Log.d("resultcheck",items.toString());
                        //items=new JSONArray(features.toString());
                    for(int i=0;i<items.length();i++) {
                        JSONObject d = items.getJSONObject(i);
                        JSONObject c = d.getJSONObject("properties");
                        earthquakes.add(new Earthquake(
                                c.getDouble("mag"),
                                c.getString("place"),
                                c.getLong("time"),
                                c.getString("url")
                               // c.has("msrp")?c.getDouble("msrp"):0.00
                        ));
                    }
//EarthquakeActivity EA=new EarthquakeActivity();
//                    EA.ViewRecommend(earthquakes);
                    }
                    catch (Throwable t) {
                        Log.e("My App1", t.getMessage());
                    }

                // Return the list of earthquake
        } catch (Exception e) {
            Log.e(LOG_TAG, "Exception:  ", e);
        }
        // Return the list of earthquakes
        return earthquakes;
    }
}
