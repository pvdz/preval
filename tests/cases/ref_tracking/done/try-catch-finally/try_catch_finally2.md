# Preval test case

# try_catch_finally2.md

> Ref tracking > Done > Try-catch-finally > Try catch finally2

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
try {
  $(x);         // x=1
  x = 2;
} catch (e) {
  $(x);         // x=1 (2) (x can only not be 2 if something throws after hte assignment completes, which I think is impossible, but we'll fix that later)
  if ($()) {
    x = 3;
  }
} finally {
  $(x);         // x=1 2 3 
  if ($()) {
    x = 4;
  }
}
$(x);           // x=1 2 3 4
`````


## Output

(Annotated with pids)

`````filename=intro
let /*___7__*/ x = 1;
let /*___10__*/ $implicitThrow = false;
let /*___13__*/ $finalCatchArg = /*___14__*/ undefined;
try /*16~24*/ {
  $(/*___20__*/ x);
  /*___24__*/ x = 2;
} catch (/*___26__*/ e) /*27~57*/ {
  try /*29~46*/ {
    $(/*___34__*/ x);
    const /*___36__*/ tmpIfTest = $();
    if (/*___40__*/ tmpIfTest) {
      /*41~45*/ /*___45__*/ x = 3;
    } /*46~46*/ else {
    }
  } catch (/*___48__*/ $finalImplicit) /*49~57*/ {
    /*___53__*/ $implicitThrow = true;
    /*___57__*/ $finalCatchArg = /*___56__*/ $finalImplicit;
  }
}
$(/*___61__*/ x);
const /*___63__*/ tmpIfTest$1 = $();
if (/*___67__*/ tmpIfTest$1) {
  /*68~72*/ /*___72__*/ x = 4;
} /*73~73*/ else {
}
if (/*___75__*/ $implicitThrow) {
  /*76~78*/ throw /*___78__*/ $finalCatchArg;
} /*79~83*/ else {
  $(/*___83__*/ x);
}
`````


## Todos triggered


None


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @7       | ########## | 20,34,61,83 | none           | 24,45,72
  - r @20      | 7
  - w @24      | ########## | 34,61,83    | 7              | 45,72
  - r @34      | 7,24
  - w @45      | ########## | 61,83       | 7,24           | 72
  - r @61      | 7,24,45
  - w @72      | ########## | 83          | 7,24,45        | none
  - r @83      | 7,24,45,72

$implicitThrow:
  - w @10          | ########## | 75          | none           | 53
  - w @53          | ########## | 75          | 10             | none
  - r @75          | 10,53

$finalCatchArg:
  - w @13          | ########## | 78          | none           | 57
  - w @57          | ########## | 78          | 13             | none
  - r @78          | 13,57

e:
  - w @26          | ########## | not read    | none           | none

tmpIfTest:
  - w @36          | ########## | 40          | none           | none
  - r @40          | 36

$finalImplicit:
  - w @48          | ########## | 56          | none           | none
  - r @56          | 48

tmpIfTest$1:
  - w @63          | ########## | 67          | none           | none
  - r @67          | 63
