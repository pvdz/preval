# Preval test case

# try_break_finally.md

> Ref tracking > Tofix > Try break finally
>
> The last read can't reach 1 at all.

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
abc: try { 
  break abc;
} finally {
  x = 2; // overwrites x=1
}
$(x); // x=2
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
abc___7__: /*8*/ {
  let $implicitThrow___11__ = false;
  let $finalStep___15__ = false;
  let $finalCatchArg___19__ = undefined___20__;
  $finally___22__: /*23*/ {
    try /*25*/ {
      $finalStep___29__ = true;
      break $finally___31__;
    } catch ($finalImplicit___33__) /*34*/ {
      $implicitThrow___38__ = true;
      $finalCatchArg___42__ = $finalImplicit___41__;
    }
  }
  x___46__ = 2;
  if ($implicitThrow___48__) {
    /*49*/ throw $finalCatchArg___51__;
  } /*52*/ else {
    if ($finalStep___54__) {
      /*55*/ break abc___57__;
    } /*58*/ else {
    }
  }
}
$(x___62__);
`````

Ref tracking result:

                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 62          | none           | 46
  - w @46      | ########## | 62          | 4              | none
  - r @62      | 4,46

$implicitThrow:
  - w @11          | ########## | 48          | none           | 38
  - w @38          | ########## | 48          | 11             | none
  - r @48          | 11,38

$finalStep:
  - w @15          | ########## | 54          | none           | 29
  - w @29          | ########## | 54          | 15             | none
  - r @54          | 15,29

$finalCatchArg:
  - w @19          | ########## | 51          | none           | 42
  - w @42          | ########## | 51          | 19             | none
  - r @51          | 19,42
