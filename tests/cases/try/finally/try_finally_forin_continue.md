# Preval test case

# try_finally_forin_continue.md

> Try > Finally > Try finally forin continue
>
> Finally transform checks

#TODO

## Input

`````js filename=intro
for (const x in {a: 1}) {
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
for (const x in { a: 1 }) {
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
    if ($implicitThrow) throw $finalCatchArg;
    else {
    }
  }
}
$(3);
`````

## Normalized

`````js filename=intro
const tmpForInDeclRhs = { a: 1 };
let x = undefined;
for (x in tmpForInDeclRhs) {
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
const tmpForInDeclRhs = { a: 1 };
for (x in tmpForInDeclRhs) {
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
const b = { a: 1 };
for (a in b) {
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
 - 3: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
