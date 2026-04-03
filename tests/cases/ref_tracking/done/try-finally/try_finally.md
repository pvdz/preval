# Preval test case

# try_finally.md

> Ref tracking > Done > Try-finally > Try finally

## Options

- refTest

## Input

`````js filename=intro
let a = 1;
try {
  $(a); // can only observe 1
  a = 2;
} finally {
  $(a); // can observe 1 2 
  a = 3;
}
$(a);   // can only observe 3
        // (finally is always entered. if it succeeds it will overwrite a
        // and otherwise it won't execute the read at all. if it gets here
        // then a will always be 3)
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
} catch (/*___25__*/ $finalImplicit) /*26~36*/ {
  /* stmt(27): */ $(/*___30__*/ a);
  /* stmt(31): */ /*___34__*/ a = 3;
  /* stmt(35): */ throw /*___36__*/ $finalImplicit;
}
/* stmt(37): */ $(/*___40__*/ a);
/* stmt(41): */ /*___44__*/ a = 3;
/* stmt(45): */ if (/*___46__*/ $implicitThrow) {
  /*47~49*/ /* stmt(48): */ throw /*___49__*/ $finalCatchArg;
} /*50~54*/ else {
  /* stmt(51): */ $(/*___54__*/ a);
}
`````


## Todos triggered


None


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
a:
  - w @6       | ########## | 19,30       | none           | 23,34
  - r @19      | 6
  - w @23      | ########## | 30,40       | 6              | 34,44
  - r @30      | 6,23
  - w @34      | ########## | not read    | 6,23           | none
  - r @40      | 23
  - w @44      | ########## | 54          | 23             | none
  - r @54      | 44

$implicitThrow:
  - w @9           | ########## | 46          | none           | none
  - r @46          | 9

$finalCatchArg:
  - w @12          | ########## | 49          | none           | none
  - r @49          | 12

$finalImplicit:
  - w @25          | ########## | 36          | none           | none
  - r @36          | 25
