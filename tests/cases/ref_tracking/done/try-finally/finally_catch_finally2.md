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
    $(x);       // x=1
    x = 2;
    try {
      $(x);     // x=2
      x = 3;
    } finally {
      $(x);     // x=2 3
      x = 4;
      $(x);     // x=4
    }
  } catch {
    $(x);       // x=1 2 3 4
    x = 5;
    $(x);       // x=5
  }
} finally {
  $(x);         // x=1 2 3 4 5
}
$(x);           // x=4 5
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
let $implicitThrow$1___8__ = false;
let $finalCatchArg$1___12__ = undefined___13__;
try /*15*/ {
  $(x___19__);
  x___23__ = 2;
  let $implicitThrow___26__ = false;
  let $finalCatchArg___30__ = undefined___31__;
  try /*33*/ {
    $(x___37__);
    x___41__ = 3;
  } catch ($finalImplicit___43__) /*44*/ {
    $implicitThrow___48__ = true;
    $finalCatchArg___52__ = $finalImplicit___51__;
  }
  $(x___56__);
  x___60__ = 4;
  $(x___64__);
  if ($implicitThrow___66__) {
    /*67*/ throw $finalCatchArg___69__;
  } /*70*/ else {
  }
} catch (e___72__) /*73*/ {
  try /*75*/ {
    $(x___79__);
    x___83__ = 5;
    $(x___87__);
  } catch ($finalImplicit$1___89__) /*90*/ {
    $implicitThrow$1___94__ = true;
    $finalCatchArg$1___98__ = $finalImplicit$1___97__;
  }
}
$(x___102__);
if ($implicitThrow$1___104__) {
  /*105*/ throw $finalCatchArg$1___107__;
} /*108*/ else {
  $(x___112__);
}
`````

Ref tracking result:

                     | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 19,79,102,112 | none           | 23,83
  - r @19      | 4
  - w @23      | ########## | 37,56,79,102,112 | 4              | 41,60,83
  - r @37      | 23
  - w @41      | ########## | 56,79,102,112 | 23             | 60,83
  - r @56      | 23,41
  - w @60      | ########## | 64,79,102,112 | 23,41          | 83
  - r @64      | 60
  - r @79      | 4,23,41,60
  - w @83      | ########## | 87,102,112  | 4,23,41,60     | none
  - r @87      | 83
  - r @102     | 4,23,41,60,83
  - r @112     | 4,23,41,60,83

$implicitThrow$1:
  - w @8             | ########## | 104         | none           | 94
  - w @94            | ########## | 104         | 8              | none
  - r @104           | 8,94

$finalCatchArg$1:
  - w @12            | ########## | 107         | none           | 98
  - w @98            | ########## | 107         | 12             | none
  - r @107           | 12,98

$implicitThrow:
  - w @26            | ########## | 66          | none           | 48
  - w @48            | ########## | 66          | 26             | none
  - r @66            | 26,48

$finalCatchArg:
  - w @30            | ########## | 69          | none           | 52
  - w @52            | ########## | 69          | 30             | none
  - r @69            | 30,52
