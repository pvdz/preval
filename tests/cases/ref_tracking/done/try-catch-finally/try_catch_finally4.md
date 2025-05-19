# Preval test case

# try_catch_finally4.md

> Ref tracking > Done > Try-catch-finally > Try catch finally4

## Options

- refTest

## Input

`````js filename=intro
let a = 1;
try {
  $(a); // can observe 1
  a = 2;
} catch {
  $(a); // can observe 1 2
  a = 3;
} finally {
  $(a); // can observe 1 2 3
  a = 4;
}
$(a); // x=4. anything else is an uncaught throw.
`````


## Output

(Annotated with pids)

`````filename=intro
let a___6__ = 1;
let $implicitThrow___9__ = false;
let $finalCatchArg___12__ = undefined___13__;
try /*15*/ {
  $(a___19__);
  a___23__ = 2;
} catch (e___25__) /*26*/ {
  try /*28*/ {
    $(a___32__);
    a___36__ = 3;
  } catch ($finalImplicit___38__) /*39*/ {
    $(a___43__);
    a___47__ = 4;
    throw $finalImplicit___49__;
  }
}
$(a___53__);
a___57__ = 4;
if ($implicitThrow___59__) {
  /*60*/ throw $finalCatchArg___62__;
} /*63*/ else {
  $(a___67__);
}
`````


## Todos triggered


None


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
a:
  - w @6       | ########## | 19,32,43    | none           | 23,36,47
  - r @19      | 6
  - w @23      | ########## | 32,43,53    | 6              | 36,47,57
  - r @32      | 6,23
  - w @36      | ########## | 43,53       | 6,23           | 47,57
  - r @43      | 6,23,36
  - w @47      | ########## | not read    | 6,23,36        | none
  - r @53      | 23,36
  - w @57      | ########## | 67          | 23,36          | none
  - r @67      | 57

$implicitThrow:
  - w @9           | ########## | 59          | none           | none
  - r @59          | 9

$finalCatchArg:
  - w @12          | ########## | 62          | none           | none
  - r @62          | 12
