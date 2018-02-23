<?php
    if(!empty($_POST['data'])){
        $data = $_POST['data'];
        
        $file = fopen("highScores.txt", 'w'); //creates new file
        fwrite($file, "test");
        fclose($file);
    }
?>