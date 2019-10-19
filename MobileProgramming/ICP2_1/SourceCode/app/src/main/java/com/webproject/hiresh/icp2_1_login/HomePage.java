package com.webproject.hiresh.icp2_1_login;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;

public class HomePage extends AppCompatActivity {

    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);
    }
    public void Logout(View v) {
        //This code redirects the from Home page to the Login page.
        Intent redirect = new Intent(HomePage.this, LoginActivity.class);
        startActivity(redirect);
    }
}
