        // init variables
        let timer = false;
        let hours = 0;
        let minutes = 0;
        let seconds = 0;
        let hrdsec = 0;
        let difficulty = 1;
        let markNumber = 0;
        let erase = false;
        let boardsolve = [];
        let boardinit = [];
        let boardcheck = [];
        let duplicatecheck = true;
        let btnidcheck = 0;
        let btnid = 0;
        let countNum = [];

        // one solved board to create new puzzle
        let board = [
            [2, 8, 6, 7, 5, 4, 9, 3, 1],
            [9, 3, 1, 2, 8, 6, 7, 5, 4],
            [7, 5, 4, 9, 1, 3, 8, 6, 2],
            [8, 9, 2, 6, 7, 5, 4, 1, 3],
            [6, 7, 5, 4, 3, 1, 2, 9, 8],
            [4, 1, 3, 8, 9, 2, 6, 7, 5],
            [5, 6, 9, 3, 4, 8, 1, 2, 7],
            [3, 4, 7, 1, 2, 9, 5, 8, 6],
            [1, 2, 8, 5, 6, 7, 3, 4, 9]
        ];

        let backgroundColorArray = [
            ["L", "L", "L", "D", "D", "D", "L", "L", "L"],
            ["L", "L", "L", "D", "D", "D", "L", "L", "L"],
            ["L", "L", "L", "D", "D", "D", "L", "L", "L"],
            ["D", "D", "D", "L", "L", "L", "D", "D", "D"],
            ["D", "D", "D", "L", "L", "L", "D", "D", "D"],
            ["D", "D", "D", "L", "L", "L", "D", "D", "D"],
            ["L", "L", "L", "D", "D", "D", "L", "L", "L"],
            ["L", "L", "L", "D", "D", "D", "L", "L", "L"],
            ["L", "L", "L", "D", "D", "D", "L", "L", "L"],
            ["D", "D", "D", "L", "L", "L", "D", "D", "D"],
            ["D", "D", "D", "L", "L", "L", "D", "D", "D"],
            ["D", "D", "D", "L", "L", "L", "D", "D", "D"],
        ];

        let seqIndexArray = [
            [[0,0], [0,1], [0,2], [1,0], [1,1], [1,2], [2,0], [2,1], [2,2]],
            [[0,3], [0,4], [0,5], [1,3], [1,4], [1,5], [2,3], [2,4], [2,5]],
            [[0,6], [0,7], [0,8], [1,6], [1,7], [1,8], [2,6], [2,7], [2,8]],
            [[3,0], [3,1], [3,2], [4,0], [4,1], [4,2], [5,0], [5,1], [5,2]],
            [[3,3], [3,4], [3,5], [4,3], [4,4], [4,5], [5,3], [5,4], [5,5]],
            [[3,6], [3,7], [3,8], [4,6], [4,7], [4,8], [5,6], [5,7], [5,8]],
            [[6,0], [6,1], [6,2], [7,0], [7,1], [7,2], [8,0], [8,1], [8,2]],
            [[6,3], [6,4], [6,5], [7,3], [7,4], [7,5], [8,3], [8,4], [8,5]],
            [[6,6], [6,7], [6,8], [7,6], [7,7], [7,8], [8,6], [8,7], [8,8]],
        ];

        boardinit = board.map(row => [...row]);
        let leveldif1 = document.getElementById("dif1");
        let leveldif2 = document.getElementById("dif2");
        let leveldif3 = document.getElementById("dif3");
        let leveldif4 = document.getElementById("dif4");
        let leveldif5 = document.getElementById("dif5");

        let btn1 = document.getElementById("btn1");
        let btn2 = document.getElementById("btn2");
        let btn3 = document.getElementById("btn3");
        let btn4 = document.getElementById("btn4");
        let btn5 = document.getElementById("btn5");

        let marknum1 = document.getElementById("num1");
        let marknum2 = document.getElementById("num2");
        let marknum3 = document.getElementById("num3");
        let marknum4 = document.getElementById("num4");
        let marknum5 = document.getElementById("num5");
        let marknum6 = document.getElementById("num6");
        let marknum7 = document.getElementById("num7");
        let marknum8 = document.getElementById("num8");
        let marknum9 = document.getElementById("num9");

        let spnum1 = document.getElementById("sp1");
        let spnum2 = document.getElementById("sp2");
        let spnum3 = document.getElementById("sp3");
        let spnum4 = document.getElementById("sp4");
        let spnum5 = document.getElementById("sp5");
        let spnum6 = document.getElementById("sp6");
        let spnum7 = document.getElementById("sp7");
        let spnum8 = document.getElementById("sp8");
        let spnum9 = document.getElementById("sp9");

        // enable difficulty button and disable other
        btn1.disabled = true;
        btn2.disabled = true;
        btn3.disabled = true;
        btn4.disabled = true;
        btn5.disabled = true;

        marknum1.disabled = true;
        marknum2.disabled = true;
        marknum3.disabled = true;
        marknum4.disabled = true;
        marknum5.disabled = true;
        marknum6.disabled = true;
        marknum7.disabled = true;
        marknum8.disabled = true;
        marknum9.disabled = true;

        // disable all number button bin
        let btnBox = document.querySelectorAll(".btn-box");
        for (i=0;i<9;i++){
            for (j=0;j<9;j++){
                btnid = "btn" + (i+1) + (j+1);
                document.getElementById(btnid).disabled = true;
                document.getElementById(btnid).style.backgroundColor = backgroundColorArray[i][j] == "L" ? "rgb(255, 255, 255)" : "rgba(255, 255, 255, 0.87)";
            }
        }

        // button press listener
        btnBox.forEach((btn) => {
            btn.addEventListener("click", () => {
                if(erase) {
                    countNum[Number(btn.innerText)]--;
                    if (Number(btn.innerText) == 1) {
                        sp1.innerText = 9 - countNum[Number(btn.innerText)];
                    } else if (Number(btn.innerText) == 2) {
                        sp2.innerText = 9 - countNum[Number(btn.innerText)];
                    } else if (Number(btn.innerText) == 3) {
                        sp3.innerText = 9 - countNum[Number(btn.innerText)];
                    } else if (Number(btn.innerText) == 4) {
                        sp4.innerText = 9 - countNum[Number(btn.innerText)];
                    } else if (Number(btn.innerText) == 5) {
                        sp5.innerText = 9 - countNum[Number(btn.innerText)];
                    } else if (Number(btn.innerText) == 6) {
                        sp6.innerText = 9 - countNum[Number(btn.innerText)];
                    } else if (Number(btn.innerText) == 7) {
                        sp7.innerText = 9 - countNum[Number(btn.innerText)];
                    } else if (Number(btn.innerText) == 8) {
                        sp8.innerText = 9 - countNum[Number(btn.innerText)];
                    } else if (Number(btn.innerText) == 9) {
                        sp9.innerText = 9 - countNum[Number(btn.innerText)];
                    }
                    btn.innerText = "";
                    } else {
                    if (markNumber > 0 && markNumber <10) {
                        countNum[markNumber]++;
                        if (markNumber == 1) {
                            sp1.innerText = 9 - countNum[markNumber];
                        } else if (markNumber == 2) {
                            sp2.innerText = 9 - countNum[markNumber];
                        } else if (markNumber == 3) {
                            sp3.innerText = 9 - countNum[markNumber];
                        } else if (markNumber == 4) {
                            sp4.innerText = 9 - countNum[markNumber];
                        } else if (markNumber == 5) {
                            sp5.innerText = 9 - countNum[markNumber];
                        } else if (markNumber == 6) {
                            sp6.innerText = 9 - countNum[markNumber];
                        } else if (markNumber == 7) {
                            sp7.innerText = 9 - countNum[markNumber];
                        } else if (markNumber == 8) {
                            sp8.innerText = 9 - countNum[markNumber];
                        } else if (markNumber == 9) {
                            sp9.innerText = 9 - countNum[markNumber];
                        }
                        btn.innerText = markNumber;
                        btn.style.color = "blue";
                        btn.disabled = true;
                        playBeep();
                    } else {
                        document.getElementById("msg").innerText = "Please click (1-9) to Start Mark number ";
                    }
                }
            })
        });

        // function for press start button
        function funcstart(){
            timer = true;
            hours = 0;
            minutes = 0;
            seconds = 0;
            hrdsec = 0;
            updateTimer();
            board = boardinit.map(row => [...row]);
            generateBoard();
            boardsolve = [];
            boardsolve = board.map(row => [...row]);
            generatePuzzle(difficulty); 
            displayGeneratedPuzzle(board);
            marknum1.disabled = false;
            marknum2.disabled = false;
            marknum3.disabled = false;
            marknum4.disabled = false;
            marknum5.disabled = false;
            marknum6.disabled = false;
            marknum7.disabled = false;
            marknum8.disabled = false;
            marknum9.disabled = false;
            marknum1.style.color = "black";
            marknum2.style.color = "black";
            marknum3.style.color = "black";
            marknum4.style.color = "black";
            marknum4.style.color = "black";
            marknum5.style.color = "black";
            marknum6.style.color = "black";
            marknum7.style.color = "black";
            marknum8.style.color = "black";
            marknum9.style.color = "black";
            spnum1.style.color = "black";
            spnum2.style.color = "black";
            spnum3.style.color = "black";
            spnum4.style.color = "black";
            spnum4.style.color = "black";
            spnum5.style.color = "black";
            spnum6.style.color = "black";
            spnum7.style.color = "black";
            spnum8.style.color = "black";
            spnum9.style.color = "black";
            btn1.disabled = true;
            btn2.disabled = false;
            btn3.disabled = false;
            btn4.disabled = false;
            btn5.disabled = false;
            btn2.style.color = "black";
            btn3.style.color = "black";
            btn4.style.color = "black";
            btn4.style.color = "black";
            btn5.style.color = "black";
            document.getElementById("msg").innerText = "Please click (1-9) to Start Mark number";
            countNum = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,];
            for (i=0;i<9;i++){
                for (j=0;j<9;j++){
                    btnid = "btn" + (i+1) + (j+1);
                    document.getElementById(btnid).disabled = true;
                    if (backgroundColorArray[i][j] == "L"){
                        document.getElementById(btnid).style.backgroundColor = "rgb(255, 255, 255)";
                    } else {
                        document.getElementById(btnid).style.backgroundColor = "rgba(255, 255, 255, 0.87)";
                    }
                    // document.getElementById(btnid).style.backgroundColor = backgroundColorArray[i][j] == "L" ? "rgb(255, 255, 255)" : "rgba(255, 255, 255, 0.87)";
                    if(board[i][j] != "") {
                        countNum[board[i][j]]++;
                    } else {                    
                        countNum[0]++;
                    }
                    // console.log("countNum",countNum);
                }
            }
                sp1.innerText = 9 - countNum[1];
                sp2.innerText = 9 - countNum[2];
                sp3.innerText = 9 - countNum[3];
                sp4.innerText = 9 - countNum[4];
                sp5.innerText = 9 - countNum[5];
                sp6.innerText = 9 - countNum[6];
                sp7.innerText = 9 - countNum[7];
                sp8.innerText = 9 - countNum[8];
                sp9.innerText = 9 - countNum[9];
        }

        // function for press pause button
        function funcpause(){
            if (timer){
                timer = false;
                document.getElementById("btn4").innerText = "Resume";
                btn1.disabled = true;
                btn2.disabled = true;
                btn3.disabled = true;
                btn4.disabled = false;
                btn5.disabled = true;
                marknum1.disabled = true;
                marknum2.disabled = true;
                marknum3.disabled = true;
                marknum4.disabled = true;
                marknum5.disabled = true;
                marknum6.disabled = true;
                marknum7.disabled = true;
                marknum8.disabled = true;
                marknum9.disabled = true;
                marknum1.style.color = "rgba(0, 0, 0, 0.3)";
                marknum2.style.color = "rgba(0, 0, 0, 0.3)";
                marknum3.style.color = "rgba(0, 0, 0, 0.3)";
                marknum4.style.color = "rgba(0, 0, 0, 0.3)";
                marknum4.style.color = "rgba(0, 0, 0, 0.3)";
                marknum5.style.color = "rgba(0, 0, 0, 0.3)";
                marknum6.style.color = "rgba(0, 0, 0, 0.3)";
                marknum7.style.color = "rgba(0, 0, 0, 0.3)";
                marknum8.style.color = "rgba(0, 0, 0, 0.3)";
                marknum9.style.color = "rgba(0, 0, 0, 0.3)";
                spnum1.style.color = "rgba(0, 0, 0, 0.3)";
                spnum2.style.color = "rgba(0, 0, 0, 0.3)";
                spnum3.style.color = "rgba(0, 0, 0, 0.3)";
                spnum4.style.color = "rgba(0, 0, 0, 0.3)";
                spnum4.style.color = "rgba(0, 0, 0, 0.3)";
                spnum5.style.color = "rgba(0, 0, 0, 0.3)";
                spnum6.style.color = "rgba(0, 0, 0, 0.3)";
                spnum7.style.color = "rgba(0, 0, 0, 0.3)";
                spnum8.style.color = "rgba(0, 0, 0, 0.3)";
                spnum9.style.color = "rgba(0, 0, 0, 0.3)";

                document.getElementById("msg").innerText = "Please click pause";
                for (i=0;i<9;i++){
                    for (j=0;j<9;j++){
                        btnid = "btn" + (i+1) + (j+1);
                        document.getElementById(btnid).style.color = "rgba(0, 0, 0, 0.3)";
                    }
                }
            } else {
                timer = true;
                document.getElementById("btn4").innerText = "Pause";
                btn1.disabled = true;
                btn2.disabled = false;
                btn3.disabled = false;
                btn4.disabled = false;
                btn5.disabled = false;
                btn2.style.color = "black";
                btn3.style.color = "black";
                btn4.style.color = "black";
                btn4.style.color = "black";
                btn5.style.color = "black";
                marknum1.disabled = false;
                marknum2.disabled = false;
                marknum3.disabled = false;
                marknum4.disabled = false;
                marknum5.disabled = false;
                marknum6.disabled = false;
                marknum7.disabled = false;
                marknum8.disabled = false;
                marknum9.disabled = false;
                marknum1.style.color = "black";
                marknum2.style.color = "black";
                marknum3.style.color = "black";
                marknum4.style.color = "black";
                marknum4.style.color = "black";
                marknum5.style.color = "black";
                marknum6.style.color = "black";
                marknum7.style.color = "black";
                marknum8.style.color = "black";
                marknum9.style.color = "black";
                spnum1.style.color = "black";
                spnum2.style.color = "black";
                spnum3.style.color = "black";
                spnum4.style.color = "black";
                spnum4.style.color = "black";
                spnum5.style.color = "black";
                spnum6.style.color = "black";
                spnum7.style.color = "black";
                spnum8.style.color = "black";
                spnum9.style.color = "black";
                for (i=0;i<9;i++){
                    for (j=0;j<9;j++){
                        btnid = "btn" + (i+1) + (j+1);
                        if (board[i][j] == ""){
                            if (document.getElementById(btnid).innerText == ""){
                                document.getElementById(btnid).disabled = false;
                            } else {
                                document.getElementById(btnid).disabled = true;
                                document.getElementById(btnid).style.color = "blue";
                            }
                        } else {
                            document.getElementById(btnid).style.color = "black";
                            document.getElementById(btnid).disabled = true;
                        }
                    }
                }
                updateTimer();
                document.getElementById("msg").innerText = "Please click resume ";
            }
        }

        // function to press reset button
        function funcreset(){
            timer = false;
            hours = 0;
            minutes = 0;
            seconds = 0;
            hrdsec = 0;
            countNum = [];
            for (i=0;i<9;i++){
                for (j=0;j<9;j++){
                    btnid = "btn" + (i+1) + (j+1);
                    document.getElementById(btnid).style.backgroundColor = backgroundColorArray[i][j] == "L" ? "rgb(255, 255, 255)" : "rgba(255, 255, 255, 0.87)";
                }
            }
            updateTimer();
            displayGeneratedPuzzle(board);
            marknum1.style.backgroundColor = "rgb(255, 255, 255)";
            marknum2.style.backgroundColor = "rgb(255, 255, 255)";
            marknum3.style.backgroundColor = "rgb(255, 255, 255)";
            marknum4.style.backgroundColor = "rgb(255, 255, 255)";
            marknum5.style.backgroundColor = "rgb(255, 255, 255)";
            marknum6.style.backgroundColor = "rgb(255, 255, 255)";
            marknum7.style.backgroundColor = "rgb(255, 255, 255)";
            marknum8.style.backgroundColor = "rgb(255, 255, 255)";
            marknum9.style.backgroundColor = "rgb(255, 255, 255)";
            marknum1.style.color = "black";
            marknum2.style.color = "black";
            marknum3.style.color = "black";
            marknum4.style.color = "black";
            marknum5.style.color = "black";
            marknum6.style.color = "black";
            marknum7.style.color = "black";
            marknum8.style.color = "black";
            marknum9.style.color = "black";
            spnum1.style.color = "black";
            spnum2.style.color = "black";
            spnum3.style.color = "black";
            spnum4.style.color = "black";
            spnum5.style.color = "black";
            spnum6.style.color = "black";
            spnum7.style.color = "black";
            spnum8.style.color = "black";
            spnum9.style.color = "black";

            for (i=0;i<9;i++){
                for (j=0;j<9;j++){
                    btnid = "btn" + (i+1) + (j+1);
                    document.getElementById(btnid).disabled = true;
                    document.getElementById(btnid).style.backgroundColor = backgroundColorArray[i][j] == "L" ? "rgb(255, 255, 255)" : "rgba(255, 255, 255, 0.87)";
                }
            }
        }

        // function to press solve button
        function funcsolve(){
            timer = false;
            document.getElementById("msg").innerText = "Please click Start to play game";
            btn2.style.color = "rgba(0, 0, 0, 0.3)"
            btn3.style.color = "rgba(0, 0, 0, 0.3)"
            btn4.style.color = "rgba(0, 0, 0, 0.3)"
            btn5.style.color = "rgba(0, 0, 0, 0.3)"
            btn1.disabled = false;
            btn2.disabled = true;
            btn3.disabled = true;
            btn4.disabled = true;
            btn5.disabled = true;
            marknum1.disabled = true;
            marknum2.disabled = true;
            marknum3.disabled = true;
            marknum4.disabled = true;
            marknum5.disabled = true;
            marknum6.disabled = true;
            marknum7.disabled = true;
            marknum8.disabled = true;
            marknum9.disabled = true;
            marknum1.style.color = "rgba(0, 0, 0, 0.3)";
            marknum2.style.color = "rgba(0, 0, 0, 0.3)";
            marknum3.style.color = "rgba(0, 0, 0, 0.3)";
            marknum4.style.color = "rgba(0, 0, 0, 0.3)";
            marknum5.style.color = "rgba(0, 0, 0, 0.3)";
            marknum6.style.color = "rgba(0, 0, 0, 0.3)";
            marknum7.style.color = "rgba(0, 0, 0, 0.3)";
            marknum8.style.color = "rgba(0, 0, 0, 0.3)";
            marknum9.style.color = "rgba(0, 0, 0, 0.3)";
            spnum1.style.color = "rgba(0, 0, 0, 0.3)";
            spnum2.style.color = "rgba(0, 0, 0, 0.3)";
            spnum3.style.color = "rgba(0, 0, 0, 0.3)";
            spnum4.style.color = "rgba(0, 0, 0, 0.3)";
            spnum5.style.color = "rgba(0, 0, 0, 0.3)";
            spnum6.style.color = "rgba(0, 0, 0, 0.3)";
            spnum7.style.color = "rgba(0, 0, 0, 0.3)";
            spnum8.style.color = "rgba(0, 0, 0, 0.3)";
            spnum9.style.color = "rgba(0, 0, 0, 0.3)";
            marknum1.style.backgroundColor = "rgb(255, 255, 255)";
            marknum2.style.backgroundColor = "rgb(255, 255, 255)";
            marknum3.style.backgroundColor = "rgb(255, 255, 255)";
            marknum4.style.backgroundColor = "rgb(255, 255, 255)";
            marknum5.style.backgroundColor = "rgb(255, 255, 255)";
            marknum6.style.backgroundColor = "rgb(255, 255, 255)";
            marknum7.style.backgroundColor = "rgb(255, 255, 255)";
            marknum8.style.backgroundColor = "rgb(255, 255, 255)";
            marknum9.style.backgroundColor = "rgb(255, 255, 255)";
            document.getElementById(btnid).disabled = false;
            boardcheck = boardinit.map(row => [...row]);
            for (i=0;i<9;i++){
                for (j=0;j<9;j++){
                    btnid = "btn" + (i+1) + (j+1);
                    boardcheck[i][j] = document.getElementById(btnid).innerText == "" ? 0 : Number(document.getElementById(btnid).innerText);
                }    
            }
            duplicatecheck = checkDuplicatesRow(boardcheck);
            if (duplicatecheck) {
                duplicatecheck = checkDuplicatesCol(boardcheck);
            }
            if (duplicatecheck) {
                duplicatecheck = checkDuplicatesSeq(boardcheck, seqIndexArray);
            }

            let count = 0;
            for (i=0;i<9;i++){
                for (j=0;j<9;j++){
                    btnid = "btn" + (i+1) + (j+1);
                    document.getElementById(btnid).disabled = true;
                    document.getElementById(btnid).style.color = "black";
                    document.getElementById(btnid).style.backgroundColor = backgroundColorArray[i][j] == "L" ? "rgb(255, 255, 255)" : "rgba(255, 255, 255, 0.87)";
                    document.getElementById(btnid).style.fontSize = "2.2rem";
                    if (board[i][j] == ""){
                        if (duplicatecheck) {
                            document.getElementById(btnid).style.color = "green";
                        } else {
                            if(document.getElementById(btnid).innerText == boardsolve[i][j]){
                                document.getElementById(btnid).style.color = "green";
                            } else if(document.getElementById(btnid).innerText == ""){
                                document.getElementById(btnid).innerText = boardsolve[i][j];
                                document.getElementById(btnid).style.color = "red";
                                count++
                            } else if(document.getElementById(btnid).innerText != boardsolve[i][j]){
                                document.getElementById(btnid).style.fontSize = "1.2rem";
                                document.getElementById(btnid).innerHTML = "<span style=\"color:red;\">" + document.getElementById(btnid).innerText + "<span><span style=\"color:green;\">(" + boardsolve[i][j] + ")<span>";
                                    count++;
                            }
                        }
                    }
                }
            }

            if (!duplicatecheck) {
                if (count > 0) {
                    document.getElementById("msg").innerHTML = "<span class=\"msgloser\">Loser</span> (" + count + " Mistake) Cilck Start to play";
                    textToSpeechEng("<span class=\"msgloser\">Loser</span> (" + count + " Mistake)");
                } else {
                    document.getElementById("msg").innerHTML = "<span class=\"msgwinner\">Winner</span> click Start to play";
                    textToSpeechEng("Winner");
                }
            } else if (duplicatecheck) {
                document.getElementById("msg").innerHTML = "<span class=\"msgwinner\">Winner</span> click Start to play";
                    textToSpeechEng("Winner");
            }
        }

        // function for press erase button
        function funcerase() {
            if (!erase) {
                erase = true;
                btn5.style.backgroundColor = "blue";
                btn5.style.color = "yellow";
                btn5.disabled = true;
                document.getElementById("msg").innerText = "Please click marked bin to erase";
                marknum1.style.backgroundColor = "rgb(255, 255, 255)";
                marknum2.style.backgroundColor = "rgb(255, 255, 255)";
                marknum3.style.backgroundColor = "rgb(255, 255, 255)";
                marknum4.style.backgroundColor = "rgb(255, 255, 255)";
                marknum5.style.backgroundColor = "rgb(255, 255, 255)";
                marknum6.style.backgroundColor = "rgb(255, 255, 255)";
                marknum7.style.backgroundColor = "rgb(255, 255, 255)";
                marknum8.style.backgroundColor = "rgb(255, 255, 255)";
                marknum9.style.backgroundColor = "rgb(255, 255, 255)";
                marknum1.style.color = "black";
                marknum2.style.color = "black";
                marknum3.style.color = "black";
                marknum4.style.color = "black";
                marknum5.style.color = "black";
                marknum6.style.color = "black";
                marknum7.style.color = "black";
                marknum8.style.color = "black";
                marknum9.style.color = "black";
                spnum1.style.color = "black";
                spnum2.style.color = "black";
                spnum3.style.color = "black";
                spnum4.style.color = "black";
                spnum5.style.color = "black";
                spnum6.style.color = "black";
                spnum7.style.color = "black";
                spnum8.style.color = "black";
                spnum9.style.color = "black";
                for (i=0;i<9;i++){
                    for (j=0;j<9;j++){
                        btnid = "btn" + (i+1) + (j+1);
                        document.getElementById(btnid).style.backgroundColor = backgroundColorArray[i][j] == "L" ? "rgb(255, 255, 255)" : "rgba(255, 255, 255, 0.87)";
                        if (board[i][j] == "") {
                            document.getElementById(btnid).disabled = false;
                            document.getElementById(btnid).style.color = "blue";
                        } else {
                            document.getElementById(btnid).disabled = true;
                            document.getElementById(btnid).style.color = "black";
                        }
                    }
                }
            }              
        }

        // function to display Sudoku puzzle
        function displayGeneratedPuzzle(board){
            const gameConrainer = document.getElementById("gameConrainer");
            let btnid = "";

            for (i=0;i<9;i++){
                for (j=0;j<9;j++){
                    btnid = "btn" + (i+1) + (j+1);
                    document.getElementById(btnid).innerText = board[i][j];
                    document.getElementById(btnid).style.fontSize = "2.2rem";
                    if (board[i][j] == "") {
                        document.getElementById(btnid).disabled = false;
                        document.getElementById(btnid).style.borderColor = "rgba(0, 0, 0, 0.3)";
                    } else {
                        document.getElementById(btnid).style.color = "black";
                        document.getElementById(btnid).style.fontSize = "2.2rem";
                        document.getElementById(btnid).style.fontWeight = "bold";
                        document.getElementById(btnid).disabled = true;
                    }
                }
            }
        }

        // function to press  (1-9) number button
        function setNumber(num) {
            markNumber = num;
                btn5.style.backgroundColor = "rgb(255, 255, 255)";
                btn5.style.color = "black";
                btn5.disabled = false;
                marknum1.style.backgroundColor = "rgb(255, 255, 255)";
                marknum2.style.backgroundColor = "rgb(255, 255, 255)";
                marknum3.style.backgroundColor = "rgb(255, 255, 255)";
                marknum4.style.backgroundColor = "rgb(255, 255, 255)";
                marknum5.style.backgroundColor = "rgb(255, 255, 255)";
                marknum6.style.backgroundColor = "rgb(255, 255, 255)";
                marknum7.style.backgroundColor = "rgb(255, 255, 255)";
                marknum8.style.backgroundColor = "rgb(255, 255, 255)";
                marknum9.style.backgroundColor = "rgb(255, 255, 255)";
                marknum1.style.color = "black";
                marknum2.style.color = "black";
                marknum3.style.color = "black";
                marknum4.style.color = "black";
                marknum5.style.color = "black";
                marknum6.style.color = "black";
                marknum7.style.color = "black";
                marknum8.style.color = "black";
                marknum9.style.color = "black";
                spnum1.style.color = "black";
                spnum2.style.color = "black";
                spnum3.style.color = "black";
                spnum4.style.color = "black";
                spnum5.style.color = "black";
                spnum6.style.color = "black";
                spnum7.style.color = "black";
                spnum8.style.color = "black";
                spnum9.style.color = "black";
                erase = false;

            if (markNumber == 1) {
                marknum1.style.backgroundColor = "blue";
                marknum1.style.color = "yellow";
                document.getElementById("sp1").style.color = "yellow";
                document.getElementById("msg").innerText = "Please click empty bin to mark " + markNumber;
            } else if (markNumber == 2) {
                marknum2.style.backgroundColor = "blue";
                marknum2.style.color = "yellow";
                document.getElementById("msg").innerText = "Please click empty bin to mark " + markNumber;
                document.getElementById("sp2").style.color = "yellow";
            } else if (markNumber == 3) {
                marknum3.style.backgroundColor = "blue";
                marknum3.style.color = "yellow";
                document.getElementById("msg").innerText = "Please click empty bin to mark " + markNumber;
                document.getElementById("sp3").style.color = "yellow";
            } else if (markNumber == 4) {
                marknum4.style.backgroundColor = "blue";
                marknum4.style.color = "yellow";
                document.getElementById("msg").innerText = "Please click empty bin to mark " + markNumber;
                document.getElementById("sp4").style.color = "yellow";
            } else if (markNumber == 5) {
                marknum5.style.backgroundColor = "blue";
                marknum5.style.color = "yellow";
                document.getElementById("msg").innerText = "Please click empty bin to mark " + markNumber;
                document.getElementById("sp5").style.color = "yellow";
            } else if (markNumber == 6) {
                marknum6.style.backgroundColor = "blue";
                marknum6.style.color = "yellow";
                document.getElementById("msg").innerText = "Please click empty bin to mark " + markNumber;
                document.getElementById("sp6").style.color = "yellow";
            } else if (markNumber == 7) {
                marknum7.style.backgroundColor = "blue";
                marknum7.style.color = "yellow";
                document.getElementById("msg").innerText = "Please click empty bin to mark " + markNumber;
                document.getElementById("sp7").style.color = "yellow";
            } else if (markNumber == 8) {
                marknum8.style.backgroundColor = "blue";
                marknum8.style.color = "yellow";
                document.getElementById("msg").innerText = "Please click empty bin to mark " + markNumber;
                document.getElementById("sp8").style.color = "yellow";
            } else if (markNumber == 9) {
                marknum9.style.backgroundColor = "blue";
                marknum9.style.color = "yellow";
                document.getElementById("msg").innerText = "Please click empty bin to mark " + markNumber;
                document.getElementById("sp9").style.color = "yellow";
            }
            
            for (i=0;i<9;i++){
                for (j=0;j<9;j++){
                    btnid = "btn" + (i+1) + (j+1);
                    if (board[i][j] == ""){
                        if (document.getElementById(btnid).innerText == ""){
                            document.getElementById(btnid).disabled = false;
                        } else if (Number(document.getElementById(btnid).innerText) == markNumber) {
                            document.getElementById(btnid).disabled = true;
                            document.getElementById(btnid).style.backgroundColor = "blue";
                            document.getElementById(btnid).style.color = "white";
                        } else {
                            document.getElementById(btnid).disabled = true;
                            document.getElementById(btnid).style.backgroundColor = backgroundColorArray[i][j] == "L" ? "rgb(255, 255, 255)" : "rgba(255, 255, 255, 0.87)";
                            document.getElementById(btnid).style.color = "blue";
                        }
                    } else if (board[i][j] == markNumber) { 
                        document.getElementById(btnid).disabled = true;
                        document.getElementById(btnid).style.color = "yellow";
                        document.getElementById(btnid).style.backgroundColor = "blue";
                    } else {
                        document.getElementById(btnid).disabled = true;
                        document.getElementById(btnid).style.color = "black";
                        document.getElementById(btnid).style.backgroundColor = backgroundColorArray[i][j] == "L" ? "rgb(255, 255, 255)" : "rgba(255, 255, 255, 0.87)";
                    }
                }
            }
        }

        // function to set difficulty (press any difficulty button)
        function setDifficulty(diff){
            difficulty = diff;
            document.getElementById("msg").innerText = "Please click Start to play game";
            btn1.disabled = false;
            btn2.disabled = true;
            btn3.disabled = true;
            btn4.disabled = true;
            btn5.disabled = true;
            if (difficulty == 1) {
                leveldif1.disabled = true;
                leveldif1.style.cursor = "none";
                leveldif1.style.opacity = "1";
                leveldif1.style.color = "black";
                leveldif2.disabled = true;
                leveldif3.disabled = true;
                leveldif4.disabled = true;
                leveldif5.disabled = true;
            } else if (difficulty == 2){
                leveldif1.disabled = true;
                leveldif2.disabled = true;
                leveldif2.style.cursor = "none";
                leveldif2.style.opacity = "1";
                leveldif2.style.color = "black";
                leveldif3.disabled = true;
                leveldif4.disabled = true;
                leveldif5.disabled = true;
            } else if (difficulty == 3){
                leveldif1.disabled = true;
                leveldif2.disabled = true;
                leveldif3.disabled = true;
                leveldif3.style.cursor = "none";
                leveldif3.style.opacity = "1";
                leveldif3.style.color = "black";
                leveldif4.disabled = true;
                leveldif5.disabled = true;
            } else if (difficulty == 4){
                leveldif1.disabled = true;
                leveldif2.disabled = true;
                leveldif3.disabled = true;
                leveldif4.disabled = true;
                leveldif4.style.cursor = "none";
                leveldif4.style.opacity = "1";
                leveldif4.style.color = "black";
                leveldif5.disabled = true;
            } else if (difficulty == 5){
                leveldif1.disabled = true;
                leveldif2.disabled = true;
                leveldif3.disabled = true;
                leveldif4.disabled = true;
                leveldif5.disabled = true;
                leveldif5.style.cursor = "none";
                leveldif5.style.opacity = "1";
                leveldif5.style.color = "black";
            }
        }

        // function to to generate new puzzle array as per difficulty level
        function generatePuzzle(difficulty) {
            let min = difficulty;
            let max = min + 2;
            board.forEach((row) => {
            let toReplace = shuffleArray([0, 1, 2, 3, 4, 5, 6, 7, 8]);
                for (let i = 0; i < Math.floor(Math.random() * (max - min + 1) + min); i++) {
                    row[toReplace[i]] = '';
                }
            });
        }

        // function to shuffle array to make game puzzle
        function shuffleArray(array) {
            let currentIndex = array.length,
            temporaryValue, randomIndex;
            // While there remain elements to shuffle inside the array
            while (0 !== currentIndex) {

                // Pick a remaining element from the array
                randomIndex = Math.floor(Math.random() * currentIndex);

                // randomIndex is a random number between 0 and the array position
                currentIndex -= 1;

                // We get a new currentIndex and swap it with the current element.
                temporaryValue = array[currentIndex];
                // We save the currentIndex value in temporaryValue
                array[currentIndex] = array[randomIndex];
                // Now we fill the new currentIndex position with the value from the randomIndex
                array[randomIndex] = temporaryValue;
                // Lastly in the randomIndex position we put the temporaryValue we saved before
            }
            return array;
        }

        // function to check generated puzzle is ok or not
        function generateBoard() {
            let error = "";

            // let text = "";
            // text = printArray(board);
            // document.getElementById("Arr1").innerHTML = text;

            let random10 = Math.floor((Math.random() * 10) + 1);

            // loop to generate new puzzle board
            // r is used to how many times each number is added 1 in it
            for (let r = 0; r < random10; r++) {
                // these 2 loops to select each element of array (board) and add 1 to each element
                for (let i = 0; i < 9; i++) {
                    for (let j = 0; j < 9; j++) {
                        board[i][j] = board[i][j] + 1;
                        if (board[i][j] == 10) {
                            board[i][j] = 1;
                        }
                    }
                }
            }

            checkDuplicatesRow(board);
            checkDuplicatesCol(board);
            checkDuplicatesSeq(board, seqIndexArray);
        }

        // para to print array on browser
        function printArray(Array) {
            text = "";
            for (i=0;i<9;i++){
                for (j=0;j<9;j++){
                    text += Array[i][j] + ", ";
                }
                text += "<br>";
            }
            return text;
        }

        // para to check Array duplicates elements in row
        function checkDuplicatesRow(Array){
            duplicatecheck = true;
            error = "";
            for (r=0;r<9;r++){
                for (i=0;i<9;i++){
                    for (j=i+1;j<9;j++){
                        if(j==9){j=0};
                        if(Array[r][i]===Array[r][j]){
                            duplicatecheck = false;
                        } else {
                            // console.log("Array[r][i]= ", Array[r][i], " Array[r][j] ", Array[r][j], "OK Row");
                        }
                    }
                }
            }
            return duplicatecheck;
        }

        // para to check Array duplicates elements in Col
        function checkDuplicatesCol(Array){
            duplicatecheck = true;
            error = "";
            for (r=0;r<9;r++){
                for (i=0;i<9;i++){
                    for (j=i+1;j<9;j++){
                        if(j==9){j=0};
                        if(Array[i][r]===Array[j][r]){
                            duplicatecheck = false;
                        } else {
                            // console.log("Array[i][r]= ", Array[i][r], " Array[j][r] ", Array[j][r], "OK Col");
                        }
                    }
                }
            }
            return duplicatecheck;
        }

        // para to check Array duplicates elements in Squre
        function checkDuplicatesSeq(Array, seqIndexArray){
            let s1, s2;
            duplicatecheck = true;
            error = "";

            for (r=0;r<9;r++){
                for (i=0;i<9;i++){
                    for (j=i+1;j<9;j++){
                        if(j==9){j=0};
                        if(Array[seqIndexArray[r][i][0]][seqIndexArray[r][i][1]]===Array[seqIndexArray[r][j][0]][seqIndexArray[r][j][1]]){
                            duplicatecheck = false;
                        } else {
                            // console.log("Array[seqIndexArray[r][i][0]][seqIndexArray[r][i][1]]= ", Array[seqIndexArray[r][i][0]][seqIndexArray[r][i][1]], " Array[seqIndexArray[r][j][0]][seqIndexArray[r][j][1]] ", Array[seqIndexArray[r][j][0]][seqIndexArray[r][j][1]], "OK Col");
                        }
                    }
                }
            }
            return duplicatecheck;
        }

        // display upadted time of game play
        function displayTime() {
            var displayTime = document.getElementById('displayTime');
            displayTime.innerHTML = ((hours < 10) ? '0' + hours : hours) + ':' + ((minutes < 10) ? '0' + minutes : minutes) + ':' + ((seconds < 10) ? '0' + seconds : seconds);
        }

        // update of time para
        function updateTimer() {
            if (timer) {

                d = new Date(); //object of date()
                hrdsec = parseInt(d.getMilliseconds() / 10); 

                if (hrdsec >= 99){
                    hrdsec= 0;
                    seconds++;
                    if (seconds >= 60) {
                        seconds = 0;
                        minutes++;
                        if (minutes >= 60) {
                            minutes = 0;
                            hours++;
                        }
                    }
                }
                displayTime()
                setTimeout("updateTimer()", 10);
            }
        }

        // para to speeach in english
        function textToSpeechEng(text){
            let speechSynthesis = window.speechSynthesis;
            let utterance = new SpeechSynthesisUtterance();
            utterance.lang = "en-US";
            utterance.voice = speechSynthesis.getVoices().find(voice => voice.lang === 'en-US');
            utterance.text = text;
            speechSynthesis.speak(utterance); 
        }

        // para to play beep sound when player/computer is play his turn
        function playBeep() {
            var beep = new Audio('Clock-Ticking-one.mp3'); 
            beep.play();
        }