# Preval test case

# label_finally_finally_if_true_break_single_read4.md

> Ref tracking > Done > Try-random > Label finally finally if true break single read4
> 
> A break that travels through two finally nodes before reaching its label.
>
> This was actually a regression as the whole thing was collapsed, eliminating the label and if completely so the condition was ignored.

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
back: {
  try {
    break back;
  } finally {
  }
  x = 6; // unreachable
}
$(x); // x=1
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
back___7__: /*8*/ {
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
  if ($implicitThrow___44__) {
    /*45*/ throw $finalCatchArg___47__;
  } /*48*/ else {
    break back___50__;
  }
}
$(x___54__);
`````

Ref tracking result:

                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 54          | none           | none
  - r @54      | 4

$implicitThrow:
  - w @11          | ########## | 44          | none           | 38
  - w @38          | ########## | 44          | 11             | none
  - r @44          | 11,38

$finalStep:
  - w @15          | ########## | not read    | none           | 29
  - w @29          | ########## | not read    | 15             | none

$finalCatchArg:
  - w @19          | ########## | 47          | none           | 42
  - w @42          | ########## | 47          | 19             | none
  - r @47          | 19,42
