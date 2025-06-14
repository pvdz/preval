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
let /*___6__*/ a = 1;
let /*___9__*/ $implicitThrow = false;
let /*___12__*/ $finalCatchArg = /*___13__*/ undefined;
try /*15~23*/ {
  $(/*___19__*/ a);
  /*___23__*/ a = 2;
} catch (/*___25__*/ e) /*26~49*/ {
  try /*28~36*/ {
    $(/*___32__*/ a);
    /*___36__*/ a = 3;
  } catch (/*___38__*/ $finalImplicit) /*39~49*/ {
    $(/*___43__*/ a);
    /*___47__*/ a = 4;
    throw /*___49__*/ $finalImplicit;
  }
}
$(/*___53__*/ a);
/*___57__*/ a = 4;
if (/*___59__*/ $implicitThrow) {
  /*60~62*/ throw /*___62__*/ $finalCatchArg;
} /*63~67*/ else {
  $(/*___67__*/ a);
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

e:
  - w @25          | ########## | not read    | none           | none

$finalImplicit:
  - w @38          | ########## | 49          | none           | none
  - r @49          | 38
