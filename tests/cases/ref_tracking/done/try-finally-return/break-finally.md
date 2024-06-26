# Preval test case

# break-finally.md

> Ref tracking > Done > Try-finally-return > Break-finally

## Options

- refTest

## Input

`````js filename=intro
{
  let x = 1;
  here: {
    try {
      $(); // "may fail"
      x = 2;
      break here;
    } finally {
      $(x); // 1 or 2
      x = 3;
    }

    $(x);   // unreachable
    x = 4;  // unreachable
  }
  
  $(x); // 3 (only, but because DCE is not applied yet, it'll also read 1)
}
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
here___7__: /*8*/ {
  let $implicitThrow___11__ = false;
  let $finalStep___15__ = false;
  let $finalCatchArg___19__ = undefined___20__;
  $finally___22__: /*23*/ {
    try /*25*/ {
      $();
      x___32__ = 2;
      $finalStep___36__ = true;
      break $finally___38__;
    } catch ($finalImplicit___40__) /*41*/ {
      $(x___45__);
      x___49__ = 3;
      throw $finalImplicit___51__;
    }
  }
  $(x___55__);
  x___59__ = 3;
  if ($implicitThrow___61__) {
    /*62*/ throw $finalCatchArg___64__;
  } /*65*/ else {
    break here___67__;
  }
}
$(x___71__);
`````

Ref tracking result:

                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 45,55       | none           | 32,49,59
  - w @32      | ########## | 45,55       | 4              | 49,59
  - r @45      | 4,32
  - w @49      | ########## | not read    | 4,32           | none
  - r @55      | 4,32
  - w @59      | ########## | 71          | 4,32           | none
  - r @71      | 59

$implicitThrow:
  - w @11          | ########## | 61          | none           | none
  - r @61          | 11

$finalStep:
  - w @15          | ########## | not read    | none           | 36
  - w @36          | ########## | not read    | 15             | none

$finalCatchArg:
  - w @19          | ########## | 64          | none           | none
  - r @64          | 19
