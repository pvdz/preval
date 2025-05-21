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
let x___7__ = 1;
let $implicitThrow$1___10__ = false;
let $finalCatchArg$1___13__ = undefined___14__;
try /*16*/ {
  $(x___23__);
  x___27__ = 2;
  let $implicitThrow___29__ = false;
  let $finalCatchArg___32__ = undefined___33__;
  try /*35*/ {
    $(x___39__);
    x___43__ = 3;
  } catch (e___45__) /*46*/ {
    try /*48*/ {
      $(x___52__);
      x___56__ = 4;
    } catch ($finalImplicit___58__) /*59*/ {
      $implicitThrow___63__ = true;
      $finalCatchArg___67__ = $finalImplicit___66__;
    }
  }
  $(x___71__);
  const tmpIfTest___73__ = $();
  if (tmpIfTest___77__) {
    /*78*/ x___82__ = 5;
  } /*83*/ else {
  }
  if ($implicitThrow___85__) {
    /*86*/ throw $finalCatchArg___88__;
  } /*89*/ else {
  }
} catch (e$1___91__) /*92*/ {
  try /*94*/ {
    $(x___98__);
    x___102__ = 6;
  } catch ($finalImplicit$1___104__) /*105*/ {
    $implicitThrow$1___109__ = true;
    $finalCatchArg$1___113__ = $finalImplicit$1___112__;
  }
}
$(x___117__);
const tmpIfTest$1___119__ = $();
if (tmpIfTest$1___123__) {
  /*124*/ x___128__ = 7;
} /*129*/ else {
}
if ($implicitThrow$1___131__) {
  /*132*/ throw $finalCatchArg$1___134__;
} /*135*/ else {
  $(x___139__);
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
