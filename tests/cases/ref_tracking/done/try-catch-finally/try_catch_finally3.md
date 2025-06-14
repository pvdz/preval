# Preval test case

# try_catch_finally3.md

> Ref tracking > Done > Try-catch-finally > Try catch finally3

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
try {
  $(x);           // x=1
  x = 2;
  try {
    $(x);         // x=2
    x = 3;
  } catch (e) {
    $(x);         // x=2 3
    x = 4;
  } finally {
    $(x);         // x=2 3 4 
    if ($()) {
      x = 5;
    }
  }
} catch (e) {
  $(x);           // x=1 2 3 4 5
  x = 6;
} finally {
  $(x);           // x=1 2 3 4 5 6 
  if ($()) {
    x = 7;
  }
}
// Note that 1 and 2 can not reach here because it means that
// the catch threw before overwriting x, but in that case the
// code skips this after leaving the finally.
$(x);             // x=3 4 5 6 7
`````


## Output

(Annotated with pids)

`````filename=intro
let /*___7__*/ x = 1;
let /*___10__*/ $implicitThrow$1 = false;
let /*___13__*/ $finalCatchArg$1 = /*___14__*/ undefined;
try /*16~89*/ {
  $(/*___23__*/ x);
  /*___27__*/ x = 2;
  let /*___29__*/ $implicitThrow = false;
  let /*___32__*/ $finalCatchArg = /*___33__*/ undefined;
  try /*35~43*/ {
    $(/*___39__*/ x);
    /*___43__*/ x = 3;
  } catch (/*___45__*/ e) /*46~67*/ {
    try /*48~56*/ {
      $(/*___52__*/ x);
      /*___56__*/ x = 4;
    } catch (/*___58__*/ $finalImplicit) /*59~67*/ {
      /*___63__*/ $implicitThrow = true;
      /*___67__*/ $finalCatchArg = /*___66__*/ $finalImplicit;
    }
  }
  $(/*___71__*/ x);
  const /*___73__*/ tmpIfTest = $();
  if (/*___77__*/ tmpIfTest) {
    /*78~82*/ /*___82__*/ x = 5;
  } /*83~83*/ else {
  }
  if (/*___85__*/ $implicitThrow) {
    /*86~88*/ throw /*___88__*/ $finalCatchArg;
  } /*89~89*/ else {
  }
} catch (/*___91__*/ e$1) /*92~113*/ {
  try /*94~102*/ {
    $(/*___98__*/ x);
    /*___102__*/ x = 6;
  } catch (/*___104__*/ $finalImplicit$1) /*105~113*/ {
    /*___109__*/ $implicitThrow$1 = true;
    /*___113__*/ $finalCatchArg$1 = /*___112__*/ $finalImplicit$1;
  }
}
$(/*___117__*/ x);
const /*___119__*/ tmpIfTest$1 = $();
if (/*___123__*/ tmpIfTest$1) {
  /*124~128*/ /*___128__*/ x = 7;
} /*129~129*/ else {
}
if (/*___131__*/ $implicitThrow$1) {
  /*132~134*/ throw /*___134__*/ $finalCatchArg$1;
} /*135~139*/ else {
  $(/*___139__*/ x);
}
`````


## Todos triggered


None


## Ref tracking result


                     | reads      | read by     | overWrites     | overwritten by
x:
  - w @7       | ########## | 23,98,117,139 | none           | 27,102,128
  - r @23      | 7
  - w @27      | ########## | 39,52,71,98,117,139 | 7              | 43,56,82,102,128
  - r @39      | 27
  - w @43      | ########## | 52,71,98,117,139 | 27             | 56,82,102,128
  - r @52      | 27,43
  - w @56      | ########## | 71,98,117,139 | 27,43          | 82,102,128
  - r @71      | 27,43,56
  - w @82      | ########## | 98,117,139  | 27,43,56       | 102,128
  - r @98      | 7,27,43,56,82
  - w @102     | ########## | 117,139     | 7,27,43,56,82  | 128
  - r @117     | 7,27,43,56,82,102
  - w @128     | ########## | 139         | 7,27,43,56,82,102 | none
  - r @139     | 7,27,43,56,82,102,128

$implicitThrow$1:
  - w @10            | ########## | 131         | none           | 109
  - w @109           | ########## | 131         | 10             | none
  - r @131           | 10,109

$finalCatchArg$1:
  - w @13            | ########## | 134         | none           | 113
  - w @113           | ########## | 134         | 13             | none
  - r @134           | 13,113

$implicitThrow:
  - w @29            | ########## | 85          | none           | 63
  - w @63            | ########## | 85          | 29             | none
  - r @85            | 29,63

$finalCatchArg:
  - w @32            | ########## | 88          | none           | 67
  - w @67            | ########## | 88          | 32             | none
  - r @88            | 32,67

e:
  - w @45            | ########## | not read    | none           | none

$finalImplicit:
  - w @58            | ########## | 66          | none           | none
  - r @66            | 58

tmpIfTest:
  - w @73            | ########## | 77          | none           | none
  - r @77            | 73

e$1:
  - w @91            | ########## | not read    | none           | none

$finalImplicit$1:
  - w @104           | ########## | 112         | none           | none
  - r @112           | 104

tmpIfTest$1:
  - w @119           | ########## | 123         | none           | none
  - r @123           | 119
