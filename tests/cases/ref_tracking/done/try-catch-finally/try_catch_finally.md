# Preval test case

# try_catch_finally.md

> Ref tracking > Done > Try-catch-finally > Try catch finally

## Options

- refTest

## Input

`````js filename=intro
let a = 1;
try {
  $(a); // can observe 1
  a = 2;
} catch (e) {
  $(a); // can observe 1 2
  a = 3;
} finally {
  $(a); // can observe 1 2 3 
  if ($()) {
    a = 4;
  }
}
$(a); // can observe 1, 2, 3, and 4
`````


## Output

(Annotated with pids)

`````filename=intro
let /*___7__*/ a = 1;
let /*___10__*/ $implicitThrow = false;
let /*___13__*/ $finalCatchArg = /*___14__*/ undefined;
try /*16~24*/ {
  $(/*___20__*/ a);
  /*___24__*/ a = 2;
} catch (/*___26__*/ e) /*27~48*/ {
  try /*29~37*/ {
    $(/*___33__*/ a);
    /*___37__*/ a = 3;
  } catch (/*___39__*/ $finalImplicit) /*40~48*/ {
    /*___44__*/ $implicitThrow = true;
    /*___48__*/ $finalCatchArg = /*___47__*/ $finalImplicit;
  }
}
$(/*___52__*/ a);
const /*___54__*/ tmpIfTest = $();
if (/*___58__*/ tmpIfTest) {
  /*59~63*/ /*___63__*/ a = 4;
} /*64~64*/ else {
}
if (/*___66__*/ $implicitThrow) {
  /*67~69*/ throw /*___69__*/ $finalCatchArg;
} /*70~74*/ else {
  $(/*___74__*/ a);
}
`````


## Todos triggered


None


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
a:
  - w @7       | ########## | 20,33,52,74 | none           | 24,37,63
  - r @20      | 7
  - w @24      | ########## | 33,52,74    | 7              | 37,63
  - r @33      | 7,24
  - w @37      | ########## | 52,74       | 7,24           | 63
  - r @52      | 7,24,37
  - w @63      | ########## | 74          | 7,24,37        | none
  - r @74      | 7,24,37,63

$implicitThrow:
  - w @10          | ########## | 66          | none           | 44
  - w @44          | ########## | 66          | 10             | none
  - r @66          | 10,44

$finalCatchArg:
  - w @13          | ########## | 69          | none           | 48
  - w @48          | ########## | 69          | 13             | none
  - r @69          | 13,48

e:
  - w @26          | ########## | not read    | none           | none

$finalImplicit:
  - w @39          | ########## | 47          | none           | none
  - r @47          | 39

tmpIfTest:
  - w @54          | ########## | 58          | none           | none
  - r @58          | 54
