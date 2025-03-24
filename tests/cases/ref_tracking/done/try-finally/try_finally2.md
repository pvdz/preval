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
let a___7__ = 1;
let $implicitThrow___10__ = false;
let $finalCatchArg___13__ = undefined___14__;
try /*16*/ {
  $(a___20__);
  a___24__ = 2;
} catch ($finalImplicit___26__) /*27*/ {
  $implicitThrow___31__ = true;
  $finalCatchArg___35__ = $finalImplicit___34__;
}
$(a___39__);
const tmpIfTest___41__ = $();
if (tmpIfTest___45__) {
  /*46*/ a___50__ = 3;
} /*51*/ else {
}
if ($implicitThrow___53__) {
  /*54*/ throw $finalCatchArg___56__;
} /*57*/ else {
  $(a___61__);
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

tmpIfTest:
  - w @41          | ########## | 45          | none           | none
  - r @45          | 41
