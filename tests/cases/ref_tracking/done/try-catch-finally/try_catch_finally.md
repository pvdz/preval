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
/* stmt(6): */ let /*___7__*/ a = 1;
/* stmt(9): */ let /*___10__*/ $implicitThrow = false;
/* stmt(12): */ let /*___13__*/ $finalCatchArg = /*___14__*/ undefined;
/* stmt(15): */ try /*16~24*/ {
  /* stmt(17): */ $(/*___20__*/ a);
  /* stmt(21): */ /*___24__*/ a = 2;
} catch (/*___26__*/ e) /*27~48*/ {
  /* stmt(28): */ try /*29~37*/ {
    /* stmt(30): */ $(/*___33__*/ a);
    /* stmt(34): */ /*___37__*/ a = 3;
  } catch (/*___39__*/ $finalImplicit) /*40~48*/ {
    /* stmt(41): */ /*___44__*/ $implicitThrow = true;
    /* stmt(45): */ /*___48__*/ $finalCatchArg = /*___47__*/ $finalImplicit;
  }
}
/* stmt(49): */ $(/*___52__*/ a);
/* stmt(53): */ const /*___54__*/ tmpIfTest = $();
/* stmt(57): */ if (/*___58__*/ tmpIfTest) {
  /*59~63*/ /* stmt(60): */ /*___63__*/ a = 4;
} /*64~64*/ else {
}
/* stmt(65): */ if (/*___66__*/ $implicitThrow) {
  /*67~69*/ /* stmt(68): */ throw /*___69__*/ $finalCatchArg;
} /*70~74*/ else {
  /* stmt(71): */ $(/*___74__*/ a);
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
