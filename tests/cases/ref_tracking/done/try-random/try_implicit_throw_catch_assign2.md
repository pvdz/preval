# Preval test case

# try_implicit_throw_catch_assign2.md

> Ref tracking > Done > Try-random > Try implicit throw catch assign2
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
      $(x); // x=1
      x = 2;
    } finally {
      $(x); // x=1 2
    }
    $(x); // x=2. Cannot be 1 because that's only possible under a throw.
  } catch {
    $(x); // x=1 2
    x = 3;
  }
  $(x); // x=2 3
}
`````


## Output

(Annotated with pids)

`````filename=intro
let /*___4__*/ x = 1;
$(/*___9__*/ x);
try /*11~52*/ {
  let /*___15__*/ $implicitThrow = false;
  let /*___18__*/ $finalCatchArg = /*___19__*/ undefined;
  try /*21~29*/ {
    $(/*___25__*/ x);
    /*___29__*/ x = 2;
  } catch (/*___31__*/ $finalImplicit) /*32~38*/ {
    $(/*___36__*/ x);
    throw /*___38__*/ $finalImplicit;
  }
  $(/*___42__*/ x);
  if (/*___44__*/ $implicitThrow) {
    /*45~47*/ throw /*___47__*/ $finalCatchArg;
  } /*48~52*/ else {
    $(/*___52__*/ x);
  }
} catch (/*___54__*/ e) /*55~63*/ {
  $(/*___59__*/ x);
  /*___63__*/ x = 3;
}
$(/*___67__*/ x);
`````


## Todos triggered


None


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,25,36,59  | none           | 29,63
  - r @9       | 4
  - r @25      | 4
  - w @29      | ########## | 36,42,52,59,67 | 4              | 63
  - r @36      | 4,29
  - r @42      | 29
  - r @52      | 29
  - r @59      | 4,29
  - w @63      | ########## | 67          | 4,29           | none
  - r @67      | 29,63

$implicitThrow:
  - w @15          | ########## | 44          | none           | none
  - r @44          | 15

$finalCatchArg:
  - w @18          | ########## | 47          | none           | none
  - r @47          | 18

$finalImplicit:
  - w @31          | ########## | 38          | none           | none
  - r @38          | 31

e:
  - w @54          | ########## | not read    | none           | none
