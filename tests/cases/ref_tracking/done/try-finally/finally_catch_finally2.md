# Preval test case

# finally_catch_finally2.md

> Ref tracking > Done > Try-finally > Finally catch finally2

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
try {
  try {
    $(x, 1);          // x=1
    x = 2;
    try {
      $(x, 2);        // x=2
      x = 3;
    } finally {
      $(x, 2, 3);     // x=2 3
      x = 4;
      $(x, 4);        // x=4
    }
  } catch {
    $(x, 1, 2, 3, 4); // x=1 2 3 4
    x = 5;
    $(x, 5);          // x=5
  }
} finally {
  $(x, 1,2,3,4,5);    // x=1 2 3 4 5
}
$(x, 5);              // x=4 5
`````


## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
let $implicitThrow$1___8__ = false;
let $finalCatchArg$1___12__ = undefined___13__;
try /*15*/ {
  $(x___19__, 1);
  x___24__ = 2;
  let $implicitThrow___27__ = false;
  let $finalCatchArg___31__ = undefined___32__;
  try /*34*/ {
    $(x___38__, 2);
    x___43__ = 3;
  } catch ($finalImplicit___45__) /*46*/ {
    $implicitThrow___50__ = true;
    $finalCatchArg___54__ = $finalImplicit___53__;
  }
  $(x___58__, 2, 3);
  x___64__ = 4;
  $(x___68__, 4);
  if ($implicitThrow___71__) {
    /*72*/ throw $finalCatchArg___74__;
  } /*75*/ else {
  }
} catch (e___77__) /*78*/ {
  try /*80*/ {
    $(x___84__, 1, 2, 3, 4);
    x___92__ = 5;
    $(x___96__, 5);
  } catch ($finalImplicit$1___99__) /*100*/ {
    $(x___104__, 1, 2, 3, 4, 5);
    throw $finalImplicit$1___111__;
  }
}
$(x___115__, 1, 2, 3, 4, 5);
if ($implicitThrow$1___122__) {
  /*123*/ throw $finalCatchArg$1___125__;
} /*126*/ else {
  $(x___130__, 5);
}
`````


## Ref tracking result


                     | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 19,84,104   | none           | 24,92
  - r @19      | 4
  - w @24      | ########## | 38,58,84,104 | 4              | 43,64,92
  - r @38      | 24
  - w @43      | ########## | 58,84,104   | 24             | 64,92
  - r @58      | 24,43
  - w @64      | ########## | 68,84,104,115,130 | 24,43          | 92
  - r @68      | 64
  - r @84      | 4,24,43,64
  - w @92      | ########## | 96,104,115,130 | 4,24,43,64     | none
  - r @96      | 92
  - r @104     | 4,24,43,64,92
  - r @115     | 64,92
  - r @130     | 64,92

$implicitThrow$1:
  - w @8             | ########## | 122         | none           | none
  - r @122           | 8

$finalCatchArg$1:
  - w @12            | ########## | 125         | none           | none
  - r @125           | 12

$implicitThrow:
  - w @27            | ########## | 71          | none           | 50
  - w @50            | ########## | 71          | 27             | none
  - r @71            | 27,50

$finalCatchArg:
  - w @31            | ########## | 74          | none           | 54
  - w @54            | ########## | 74          | 31             | none
  - r @74            | 31,54
