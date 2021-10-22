package com.example.reviewandroid2;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {
    String selectedPlanet = "";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Spinner spinner = (Spinner) findViewById(R.id.spinner);
        // Create an ArrayAdapter using the string array and a default spinner layout
        ArrayAdapter<CharSequence> adapter = ArrayAdapter.createFromResource(this,
                R.array.planets_array, android.R.layout.simple_spinner_item);
        // Specify the layout to use when the list of choices appears
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        // Apply the adapter to the spinner
        spinner.setAdapter(adapter);

        spinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> adapterView, View view, int i, long l) {
                String myPlanet[]= getResources().getStringArray(R.array.planets_array);
                selectedPlanet = myPlanet[i];
                Toast.makeText(getApplicationContext(),"Selected: "  +myPlanet[i]
                                ,Toast.LENGTH_LONG).show();
            }
            @Override
            public void onNothingSelected(AdapterView<?> adapterView) {

            }
        });
    }
    public void clickHandler(View view){
        EditText txtName = findViewById(R.id.txtName);
        TextView lblMsg = findViewById(R.id.textView);

        String name = txtName.getText().toString();
        if (name.length()==0){
            txtName.setError("Name is required!");
        }else{
            lblMsg.setText("Hello " + name + "\nFrom " + selectedPlanet);
        }
    }
}