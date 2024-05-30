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

    // Dead code (we could detect this)
    //$(x);
    //x = 4;
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
      $implicitThrow___45__ = true;
      $finalCatchArg___49__ = $finalImplicit___48__;
    }
  }
  $(x___53__);
  x___57__ = 3;
  if ($implicitThrow___59__) {
    /*60*/ throw $finalCatchArg___62__;
  } /*63*/ else {
    if ($finalStep___65__) {
      /*66*/ break here___68__;
    } /*69*/ else {
    }
  }
}
$(x___73__);
`````

Ref tracking result:

                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 53,73       | none           | 32,57
  - w @32      | ########## | 53          | 4              | 57
  - r @53      | 4,32
  - w @57      | ########## | 73          | 4,32           | none
  - r @73      | 4,57

$implicitThrow:
  - w @11          | ########## | 59          | none           | 45
  - w @45          | ########## | 59          | 11             | none
  - r @59          | 11,45

$finalStep:
  - w @15          | ########## | 65          | none           | 36
  - w @36          | ########## | 65          | 15             | none
  - r @65          | 15,36

$finalCatchArg:
  - w @19          | ########## | 62          | none           | 49
  - w @49          | ########## | 62          | 19             | none
  - r @62          | 19,49
