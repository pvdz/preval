# Preval test case

# try_implicit_throw_catch.md

> Ref tracking > Done > Try-random > Try implicit throw catch
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
      $();
      x = 2;
    } finally {
      $(x); // x=1 2
    }
    x = 3;
  } catch {
    $(x); // x=1 2 3
    // What if we do x=4 here?
  }
  $(x); // x=1 2 3
}
`````


## Output

(Annotated with pids)

`````filename=intro
/* stmt(3): */ let /*___4__*/ x = 1;
/* stmt(6): */ $(/*___9__*/ x);
/* stmt(10): */ try /*11~51*/ {
  /* stmt(14): */ let /*___15__*/ $implicitThrow = false;
  /* stmt(17): */ let /*___18__*/ $finalCatchArg = /*___19__*/ undefined;
  /* stmt(20): */ try /*21~28*/ {
    /* stmt(22): */ $();
    /* stmt(25): */ /*___28__*/ x = 2;
  } catch (/*___30__*/ $finalImplicit) /*31~37*/ {
    /* stmt(32): */ $(/*___35__*/ x);
    /* stmt(36): */ throw /*___37__*/ $finalImplicit;
  }
  /* stmt(38): */ $(/*___41__*/ x);
  /* stmt(42): */ if (/*___43__*/ $implicitThrow) {
    /*44~46*/ /* stmt(45): */ throw /*___46__*/ $finalCatchArg;
  } /*47~51*/ else {
    /* stmt(48): */ /*___51__*/ x = 3;
  }
} catch (/*___53__*/ e) /*54~58*/ {
  /* stmt(55): */ $(/*___58__*/ x);
}
/* stmt(59): */ $(/*___62__*/ x);
`````


## Todos triggered


None


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,35,58,62  | none           | 28
  - r @9       | 4
  - w @28      | ########## | 35,41,58,62 | 4              | 51
  - r @35      | 4,28
  - r @41      | 28
  - w @51      | ########## | 58,62       | 28             | none
  - r @58      | 4,28,51
  - r @62      | 4,28,51

$implicitThrow:
  - w @15          | ########## | 43          | none           | none
  - r @43          | 15

$finalCatchArg:
  - w @18          | ########## | 46          | none           | none
  - r @46          | 18

$finalImplicit:
  - w @30          | ########## | 37          | none           | none
  - r @37          | 30

e:
  - w @53          | ########## | not read    | none           | none
