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
  try /*17*/ {
    $(x___21__);
    x___25__ = 2;
    let $implicitThrow___28__ = false;
    let $finalCatchArg___32__ = undefined___33__;
    try /*35*/ {
      $(x___39__);
      x___43__ = 3;
    } catch ($finalImplicit___45__) /*46*/ {
      $implicitThrow___50__ = true;
      $finalCatchArg___54__ = $finalImplicit___53__;
    }
    $(x___58__);
    x___62__ = 4;
    $(x___66__);
    if ($implicitThrow___68__) {
      /*69*/ throw $finalCatchArg___71__;
    } /*72*/ else {
    }
  } catch (e___74__) /*75*/ {
    $(x___79__);
    x___83__ = 5;
    $(x___87__);
  }
} catch ($finalImplicit$1___89__) /*90*/ {
  $implicitThrow$1___94__ = true;
  $finalCatchArg$1___98__ = $finalImplicit$1___97__;
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
  - w @4       | ########## | 21,79,102,112 | none           | 25,83
  - r @21      | 4
  - w @25      | ########## | 39,58,79,102,112 | 4              | 43,62,83
  - r @39      | 25
  - w @43      | ########## | 58,79,102,112 | 25             | 62,83
  - r @58      | 25,43
  - w @62      | ########## | 66,79,102,112 | 25,43          | 83
  - r @66      | 62
  - r @79      | 4,25,43,62
  - w @83      | ########## | 87,102,112  | 4,25,43,62     | none
  - r @87      | 83
  - r @102     | 4,25,43,62,83
  - r @112     | 4,25,43,62,83

$implicitThrow$1:
  - w @8             | ########## | 104         | none           | 94
  - w @94            | ########## | 104         | 8              | none
  - r @104           | 8,94

$finalCatchArg$1:
  - w @12            | ########## | 107         | none           | 98
  - w @98            | ########## | 107         | 12             | none
  - r @107           | 12,98

$implicitThrow:
  - w @28            | ########## | 68          | none           | 50
  - w @50            | ########## | 68          | 28             | none
  - r @68            | 28,50

$finalCatchArg:
  - w @32            | ########## | 71          | none           | 54
  - w @54            | ########## | 71          | 32             | none
  - r @71            | 32,54
