package fgw.myfirstandroid;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }
    public void buttonClick(View view){
        EditText txtName =  findViewById(R.id.txtName);
        TextView textView = findViewById(R.id.textView);

        String name = txtName.getText().toString();
        if (name.length()==0){
            txtName.setError("Ten khong de trang!");
        }
        textView.setText("Welcome " + name);
    }
}