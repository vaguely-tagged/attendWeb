export async function POST(request) {

    let globalArr = []

    const monthObj = {
        January: '1',
        February: '2',
        March: '3',
        April: '4',
        May: '5',
        June: '6',
        July: '7',
        August: '8',
        September: '9',
        October: '0',
        November: '1',
        December: '2',
    }

    const year = "23"
    let dateSet = new Set();


    let rawText = await request.text()

    var modifiedText = '';
    for (var i = 0; i < rawText.length; i++) {
      if (rawText[i] === '\\') {
        modifiedText += '%';
      } else {
        modifiedText += rawText[i];
      }
    }

    let data = modifiedText.split("%")
    console.log(data)

    console.log("data length is " + data.length)
    for (var i = 0; i < data.length; i++) {

        if (i === 0) {
            globalArr[i] = ['Name(email)', 'date']
            continue
        }

        let date = data[i].split(',')[3]
        date = date.split('-')[0]
        date = date.slice(0, -1)

        let month = date.split(' ')[0]
        month = monthObj[month]

        let day = date.split(' ')[1]


        let convertedData = month + "/" + day + "/" + year

        dateSet.add(convertedData)

        globalArr[i] = [data[i].split(',')[1], convertedData]
    }


    //write to file
    let stringToWrite = ""
    let topRow

    for (var i = 0; i < globalArr.length; i++) {

        if (i === 0) {
            stringToWrite += "Name,"

            for (var j = 0; j < Array.from(dateSet).length; j++) {

                if (j < Array.from(dateSet).length - 1) {
                    stringToWrite += Array.from(dateSet)[j] + ","
                } else {
                    stringToWrite += Array.from(dateSet)[j] + "\n"
                }
            }

            topRow = stringToWrite.split(",")
        }

        stringToWrite += globalArr[i][0] + ","

        for (var j = 1; j < topRow.length; j++) {
            if (globalArr[i][1] === topRow[j]) {
                stringToWrite += 'TRUE,'
            } else {
                stringToWrite += 'FALSE,'
            }
        }

        stringToWrite += "\n"

    }

    return new Response(stringToWrite, {
        headers: {
            'Content-Type': 'text/csv',
        },
    })
}
