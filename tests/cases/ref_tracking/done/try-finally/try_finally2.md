# Preval test case

# try_finally2.md

> Ref tracking > Done > Try-finally > Try finally2

## Options

- refTest

## Input

`````js filename=intro
let a = 1;
try {
  $(a); // can observe 1
  a = 2;
} finally {
  $(a); // can observe 1 2 
  if ($()) {
    a = 3;
  }
}
$(a); // x=2 3
      // (the write 3 is conditional and the finally could be
      // entered before or after write 2 so it can observe 2 
      // and 3. The 1 is only visible under a throw.)
`````


## Output

(Annotated with pids)

`````filename=intro
/* stmt(6): */ let /*___7__*/ a = 1;
/* stmt(9): */ let /*___10__*/ $implicitThrow = false;
/* stmt(12): */ let /*___13__*/ $finalCatchArg = /*___14__*/ undefined;
/* stmt(15): */ try /*16~24*/ {
  /* stmt(17): */ $(/*___20__*/ a);
  /* stmt(21): */ /*___24__*/ a = 2;
} catch (/*___26__*/ $finalImplicit) /*27~35*/ {
  /* stmt(28): */ /*___31__*/ $implicitThrow = true;
  /* stmt(32): */ /*___35__*/ $finalCatchArg = /*___34__*/ $finalImplicit;
}
/* stmt(36): */ $(/*___39__*/ a);
/* stmt(40): */ const /*___41__*/ tmpIfTest = $();
/* stmt(44): */ if (/*___45__*/ tmpIfTest) {
  /*46~50*/ /* stmt(47): */ /*___50__*/ a = 3;
} /*51~51*/ else {
}
/* stmt(52): */ if (/*___53__*/ $implicitThrow) {
  /*54~56*/ /* stmt(55): */ throw /*___56__*/ $finalCatchArg;
} /*57~61*/ else {
  /* stmt(58): */ $(/*___61__*/ a);
}
`````


## Todos triggered


None


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
a:
  - w @7       | ########## | 20,39,61    | none           | 24,50
  - r @20      | 7
  - w @24      | ########## | 39,61       | 7              | 50
  - r @39      | 7,24
  - w @50      | ########## | 61          | 7,24           | none
  - r @61      | 7,24,50

$implicitThrow:
  - w @10          | ########## | 53          | none           | 31
  - w @31          | ########## | 53          | 10             | none
  - r @53          | 10,31

$finalCatchArg:
  - w @13          | ########## | 56          | none           | 35
  - w @35          | ########## | 56          | 13             | none
  - r @56          | 13,35

$finalImplicit:
  - w @26          | ########## | 34          | none           | none
  - r @34          | 26

tmpIfTest:
  - w @41          | ########## | 45          | none           | none
  - r @45          | 41
