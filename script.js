var tbl;
var c, r, n;
var i = 1;
c = 11;

function CreateTable()
{
    while (c > 10)
        c = prompt('Размерность системы', '2');
    r = c++;
    n = r;
    var i, j;
    tbl = document.createElement('table');
    for (i = 0; i < r; i++)
    {
        tbl.insertRow();
        for (j = 0; j < c; j++)
        {
            tbl.rows[i].insertCell();
            if (j < c - 1)
            {
                if (j > 0)
                {
                    tbl.rows[i].cells[j].innerHTML = ' + ';
                }
                tbl.rows[i].cells[j].innerHTML += '<label><input type="text" value="0" size="5" id="[' + i + '][' + j + ']">x<sub>' + (j + 1) + '</sub></label>';
            }
            else
            {
                tbl.rows[i].cells[j].innerHTML = '<label> = <input type="text" value="0" size="5" id="[' + i + '][' + j + ']"></label>';
            }
        }
    }
    document.body.insertBefore(tbl, par)
}

function PrintRoot(root)
{
    var p = document.createElement("p");
    p.innerHTML = "x<sub>" + i + "</sub> = " + root;
    document.body.appendChild(p);
    i++;
}

function solve()
{
    var mas = new Array(n);
    var x = new Array(n);
    var order = new Array(n);

    for (var i = 0; i < c; i++)
    {
        mas[i] = new Array(n + 1);
    }

    for (var i = 0; i < n; i++)
    {
        for (var j = 0; j < n + 1; j++)
        {
            mas[i][j] = document.getElementById('[' + i + '][' + j + ']').value;
        }
    }

    for (var i = 0; i < r; i++)
    {
        order[i] = i;
    }

    for (var k = 0; k < n; k++)
    {
        MainElem(k, mas, n, order);

        if (Math.abs(mas[k][k]) < 0.001)
        {
            alert('ERROR')
            return 0;
        }

        for (var j = n; j >= k; j--)
            mas[k][j] /= mas[k][k];

        for (var i = k + 1; i < n; i++)
            for (var j = n; j >= k; j--)
                mas[i][j] -= mas[k][j] * mas[i][k];
    }

    for (var i = 0; i < n; i++)
        x[i] = mas[i][n];

    for (var i = n - 2; i >= 0; i--)
        for (var j = i + 1; j < n; j++)
            x[i] -= x[j] * mas[i][j];

    for (var i = 0; i < n; i++)
    {
        for (var j = 0; j < n; j++)
        {
            if (i == order[j])
            {
                PrintRoot(x[j]);
                break;
            }
        }
    }

    return 0;
}

function MainElem(k, mas, n, order)
{
    var temp;
    var i_max, j_max;
    i_max = j_max = k;

    for (var i = k; i < n; i++)
        for (var j = k; j < n; j++)
            if (Math.abs(mas[i_max][j_max]) < Math.abs(mas[i][j]))
            {
                i_max = i;
                j_max = j;
            }

    for (var j = k; j < n + 1; j++)
    {
        temp = mas[k][j];
        mas[k][j] = mas[i_max][j];
        mas[i_max][j] = temp;
    }

    for (var i = 0; i < n; i++)
    {
        temp = mas[i][k];
        mas[i][k] = mas[i][j_max];
        mas[i][j_max] = temp;
    }

    i = order[k];
    order[k] = order[j_max];
    order[j_max] = i;
}
