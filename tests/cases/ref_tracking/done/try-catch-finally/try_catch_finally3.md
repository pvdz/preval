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
/* stmt(6): */ let /*___7__*/ x = 1;
/* stmt(9): */ let /*___10__*/ $implicitThrow$1 = false;
/* stmt(12): */ let /*___13__*/ $finalCatchArg$1 = /*___14__*/ undefined;
/* stmt(15): */ try /*16~89*/ {
  /* stmt(20): */ $(/*___23__*/ x);
  /* stmt(24): */ /*___27__*/ x = 2;
  /* stmt(28): */ let /*___29__*/ $implicitThrow = false;
  /* stmt(31): */ let /*___32__*/ $finalCatchArg = /*___33__*/ undefined;
  /* stmt(34): */ try /*35~43*/ {
    /* stmt(36): */ $(/*___39__*/ x);
    /* stmt(40): */ /*___43__*/ x = 3;
  } catch (/*___45__*/ e) /*46~67*/ {
    /* stmt(47): */ try /*48~56*/ {
      /* stmt(49): */ $(/*___52__*/ x);
      /* stmt(53): */ /*___56__*/ x = 4;
    } catch (/*___58__*/ $finalImplicit) /*59~67*/ {
      /* stmt(60): */ /*___63__*/ $implicitThrow = true;
      /* stmt(64): */ /*___67__*/ $finalCatchArg = /*___66__*/ $finalImplicit;
    }
  }
  /* stmt(68): */ $(/*___71__*/ x);
  /* stmt(72): */ const /*___73__*/ tmpIfTest = $();
  /* stmt(76): */ if (/*___77__*/ tmpIfTest) {
    /*78~82*/ /* stmt(79): */ /*___82__*/ x = 5;
  } /*83~83*/ else {
  }
  /* stmt(84): */ if (/*___85__*/ $implicitThrow) {
    /*86~88*/ /* stmt(87): */ throw /*___88__*/ $finalCatchArg;
  } /*89~89*/ else {
  }
} catch (/*___91__*/ e$1) /*92~113*/ {
  /* stmt(93): */ try /*94~102*/ {
    /* stmt(95): */ $(/*___98__*/ x);
    /* stmt(99): */ /*___102__*/ x = 6;
  } catch (/*___104__*/ $finalImplicit$1) /*105~113*/ {
    /* stmt(106): */ /*___109__*/ $implicitThrow$1 = true;
    /* stmt(110): */ /*___113__*/ $finalCatchArg$1 = /*___112__*/ $finalImplicit$1;
  }
}
/* stmt(114): */ $(/*___117__*/ x);
/* stmt(118): */ const /*___119__*/ tmpIfTest$1 = $();
/* stmt(122): */ if (/*___123__*/ tmpIfTest$1) {
  /*124~128*/ /* stmt(125): */ /*___128__*/ x = 7;
} /*129~129*/ else {
}
/* stmt(130): */ if (/*___131__*/ $implicitThrow$1) {
  /*132~134*/ /* stmt(133): */ throw /*___134__*/ $finalCatchArg$1;
} /*135~139*/ else {
  /* stmt(136): */ $(/*___139__*/ x);
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
