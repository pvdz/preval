# Preval test case

# try_finally_forof_continue.md

> Try > Finally > Try finally forof continue
>
> Finally transform checks

#TODO

## Input

`````js filename=intro
for (const x of ['a', 'b', 'c']) {
  try {
    $(x, 1);
  } finally {
    $(2);
    continue;
  }
}
$(3);
`````

## Pre Normal

`````js filename=intro
for (const x of [`a`, `b`, `c`]) {
  {
    let $implicitThrow = false;
    let $finalCatchArg = undefined;
    $finally: {
      try {
        $(x, 1);
      } catch ($finalImplicit) {
        $implicitThrow = true;
        $finalCatchArg = $finalImplicit;
      }
    }
    {
      $(2);
      continue;
    }
    if ($implicitThrow) {
      throw $finalCatchArg;
    }
  }
}
$(3);
`````

## Normalized

`````js filename=intro
const tmpForOfDeclRhs = [`a`, `b`, `c`];
let x = undefined;
for (x of tmpForOfDeclRhs) {
  let $implicitThrow = false;
  let $finalCatchArg = undefined;
  try {
    $(x, 1);
  } catch ($finalImplicit) {
    $implicitThrow = true;
    $finalCatchArg = $finalImplicit;
  }
  $(2);
  continue;
}
$(3);
`````

## Output

`````js filename=intro
let x = undefined;
const tmpForOfDeclRhs = [`a`, `b`, `c`];
for (x of tmpForOfDeclRhs) {
  try {
    $(x, 1);
  } catch ($finalImplicit) {}
  $(2);
}
$(3);
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
const b = [ "a", "b", "c" ];
for (a of b) {
  try {
    $( a, 1 );
  }
catch (c) {

  }
  $( 2 );
}
$( 3 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'a', 1
 - 2: 2
 - 3: 'b', 1
 - 4: 2
 - 5: 'c', 1
 - 6: 2
 - 7: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
