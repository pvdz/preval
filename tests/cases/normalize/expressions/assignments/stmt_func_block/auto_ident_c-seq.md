# Preval test case

# auto_ident_c-seq.md

> Normalize > Expressions > Assignments > Stmt func block > Auto ident c-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let x = 1;

    let a = { a: 999, b: 1000 };
    a = ($(1), $(2), $(x));
    $(a, x);
  }
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  {
    let x = 1;
    let a = { a: 999, b: 1000 };
    a = ($(1), $(2), $(x));
    $(a, x);
  }
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let x = 1;
  let a = { a: 999, b: 1000 };
  $(1);
  $(2);
  a = $(x);
  $(a, x);
  return undefined;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(1);
$(2);
const a = $(1);
$(a, 1);
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = $( 1 );
$( a, 1 );
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1
 - 4: 1, 1
 - 5: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
