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
let a___7__ = 1;
let $implicitThrow___10__ = false;
let $finalCatchArg___13__ = undefined___14__;
try /*16*/ {
  $(a___20__);
  a___24__ = 2;
} catch (e___26__) /*27*/ {
  try /*29*/ {
    $(a___33__);
    a___37__ = 3;
  } catch ($finalImplicit___39__) /*40*/ {
    $implicitThrow___44__ = true;
    $finalCatchArg___48__ = $finalImplicit___47__;
  }
}
$(a___52__);
const tmpIfTest___54__ = $();
if (tmpIfTest___58__) {
  /*59*/ a___63__ = 4;
} /*64*/ else {
}
if ($implicitThrow___66__) {
  /*67*/ throw $finalCatchArg___69__;
} /*70*/ else {
  $(a___74__);
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
