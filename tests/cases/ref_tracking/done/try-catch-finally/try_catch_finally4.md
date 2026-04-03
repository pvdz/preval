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
/* stmt(5): */ let /*___6__*/ a = 1;
/* stmt(8): */ let /*___9__*/ $implicitThrow = false;
/* stmt(11): */ let /*___12__*/ $finalCatchArg = /*___13__*/ undefined;
/* stmt(14): */ try /*15~23*/ {
  /* stmt(16): */ $(/*___19__*/ a);
  /* stmt(20): */ /*___23__*/ a = 2;
} catch (/*___25__*/ e) /*26~49*/ {
  /* stmt(27): */ try /*28~36*/ {
    /* stmt(29): */ $(/*___32__*/ a);
    /* stmt(33): */ /*___36__*/ a = 3;
  } catch (/*___38__*/ $finalImplicit) /*39~49*/ {
    /* stmt(40): */ $(/*___43__*/ a);
    /* stmt(44): */ /*___47__*/ a = 4;
    /* stmt(48): */ throw /*___49__*/ $finalImplicit;
  }
}
/* stmt(50): */ $(/*___53__*/ a);
/* stmt(54): */ /*___57__*/ a = 4;
/* stmt(58): */ if (/*___59__*/ $implicitThrow) {
  /*60~62*/ /* stmt(61): */ throw /*___62__*/ $finalCatchArg;
} /*63~67*/ else {
  /* stmt(64): */ $(/*___67__*/ a);
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
