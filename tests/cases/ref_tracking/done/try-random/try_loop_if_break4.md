# Preval test case

# try_loop_if_break4.md

> Ref tracking > Done > Try-random > Try loop if break4
>
> The entryReads and entryWrites for a Try must be propagated which is relevant for loops.

## Options

- refTest

## Input

`````js filename=intro
{
  let x = 1;
  $(x);       // x=1
  while (true) {
    try {
      $(x);   // x=1
    } finally {
      $(x);   // x=1
      if ($1) {
        break;
      }
      x = 2;  // Does not overwrite itself because it does not loop
      $(x);   // x=2
      break;
    }
  }
  $(x);       // x=1 2
}
`````


## Output

(Annotated with pids)

`````filename=intro
let /*___4__*/ x = 1;
$(/*___9__*/ x);
while (true) {
  /*12~55*/ let /*___16__*/ $implicitThrow = false;
  let /*___19__*/ $finalCatchArg = /*___20__*/ undefined;
  try /*22~26*/ {
    $(/*___26__*/ x);
  } catch (/*___28__*/ $finalImplicit) /*29~37*/ {
    /*___33__*/ $implicitThrow = true;
    /*___37__*/ $finalCatchArg = /*___36__*/ $finalImplicit;
  }
  $(/*___41__*/ x);
  if ($1) {
    /*44~45*/ break;
  } /*46~55*/ else {
    /*___50__*/ x = 2;
    $(/*___54__*/ x);
    break;
  }
}
$(/*___59__*/ x);
`````


## Todos triggered


None


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,26,41,59  | none           | 50
  - r @9       | 4
  - r @26      | 4
  - r @41      | 4
  - w @50      | ########## | 54,59       | 4              | none
  - r @54      | 50
  - r @59      | 4,50

$implicitThrow:
  - w @16          | ########## | not read    | none           | 33
  - w @33          | ########## | not read    | 16             | none

$finalCatchArg:
  - w @19          | ########## | not read    | none           | 37
  - w @37          | ########## | not read    | 19             | none

$finalImplicit:
  - w @28          | ########## | 36          | none           | none
  - r @36          | 28
