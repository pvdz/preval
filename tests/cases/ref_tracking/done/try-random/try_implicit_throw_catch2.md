# Preval test case

# try_implicit_throw_catch2.md

> Ref tracking > Done > Try-random > Try implicit throw catch2
>
> Demonstrating why the implicit throw is a thing we must handle
> very explicitly somehow.

## Options

- refTest

## Input

`````js filename=intro
{
  let x = 1;
  $(x); // x=1
  try {
    try {
      $();        // if this throws x remains 1
      x = 2;
    } finally {
      $();
    }
  } catch {
    // this catch is the only reason why x=1 _can_ be observed
    $(x); // x=1 3
  }
  $(x); // x=1 3
}
`````


## Output

(Annotated with pids)

`````filename=intro
/* stmt(3): */ let /*___4__*/ x = 1;
/* stmt(6): */ $(/*___9__*/ x);
/* stmt(10): */ try /*11~45*/ {
  /* stmt(14): */ let /*___15__*/ $implicitThrow = false;
  /* stmt(17): */ let /*___18__*/ $finalCatchArg = /*___19__*/ undefined;
  /* stmt(20): */ try /*21~28*/ {
    /* stmt(22): */ $();
    /* stmt(25): */ /*___28__*/ x = 2;
  } catch (/*___30__*/ $finalImplicit) /*31~36*/ {
    /* stmt(32): */ $();
    /* stmt(35): */ throw /*___36__*/ $finalImplicit;
  }
  /* stmt(37): */ $();
  /* stmt(40): */ if (/*___41__*/ $implicitThrow) {
    /*42~44*/ /* stmt(43): */ throw /*___44__*/ $finalCatchArg;
  } /*45~45*/ else {
  }
} catch (/*___47__*/ e) /*48~52*/ {
  /* stmt(49): */ $(/*___52__*/ x);
}
/* stmt(53): */ $(/*___56__*/ x);
`````


## Todos triggered


None


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,52,56     | none           | 28
  - r @9       | 4
  - w @28      | ########## | 52,56       | 4              | none
  - r @52      | 4,28
  - r @56      | 4,28

$implicitThrow:
  - w @15          | ########## | 41          | none           | none
  - r @41          | 15

$finalCatchArg:
  - w @18          | ########## | 44          | none           | none
  - r @44          | 18

$finalImplicit:
  - w @30          | ########## | 36          | none           | none
  - r @36          | 30

e:
  - w @47          | ########## | not read    | none           | none
