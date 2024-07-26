# Preval test case

# auto_ident_cond_c-seq_c-seq_simple.md

> Normalize > Expressions > Assignments > Return > Auto ident cond c-seq c-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return (a = (10, 20, $(30)) ? (40, 50, $(60)) : $($(100)));
}
$(f());
$(a);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  return (a = (10, 20, $(30)) ? (40, 50, $(60)) : $($(100)));
};
let a = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const tmpIfTest = $(30);
  if (tmpIfTest) {
    a = $(60);
    return a;
  } else {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(100);
    a = tmpCallCallee(tmpCalleeParam);
    return a;
  }
};
let a = { a: 999, b: 1000 };
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
$(a);
`````

## Output


`````js filename=intro
let a = 1;
const tmpIfTest = $(30);
if (tmpIfTest) {
  a = $(60);
  $(a);
} else {
  const tmpCalleeParam = $(100);
  a = $(tmpCalleeParam);
  $(a);
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = 1;
const b = $( 30 );
if (b) {
  a = $( 60 );
  $( a );
}
else {
  const c = $( 100 );
  a = $( c );
  $( a );
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 30
 - 2: 60
 - 3: 60
 - 4: 60
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
