# Preval test case

# write_branch_write_arrow_read_read.md

> Assigns > Write branch write arrow read read
>
> Turning a var into a const. Or not.

#TODO

## Input

`````js filename=intro
let x = $(1); // This decl should be eliminated
if ($(1)) {
  x = $(2, 'branch'); // This should get SSA'd
  const f = () => $(x, 'arrow');
  $(f(), 'result');
}
x = $(3, 'after'); // This should get SSA'd
$(x, 'final');
`````

## Pre Normal


`````js filename=intro
let x = $(1);
if ($(1)) {
  x = $(2, `branch`);
  const f = () => {
    debugger;
    return $(x, `arrow`);
  };
  $(f(), `result`);
}
x = $(3, `after`);
$(x, `final`);
`````

## Normalized


`````js filename=intro
let x = $(1);
const tmpIfTest = $(1);
if (tmpIfTest) {
  x = $(2, `branch`);
  const f = function () {
    debugger;
    const tmpReturnArg = $(x, `arrow`);
    return tmpReturnArg;
  };
  const tmpCallCallee = $;
  const tmpCalleeParam = f();
  const tmpCalleeParam$1 = `result`;
  tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
} else {
}
x = $(3, `after`);
$(x, `final`);
`````

## Output


`````js filename=intro
$(1);
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpClusterSSA_x = $(2, `branch`);
  const tmpCalleeParam = $(tmpClusterSSA_x, `arrow`);
  $(tmpCalleeParam, `result`);
} else {
}
const tmpClusterSSA_x$1 = $(3, `after`);
$(tmpClusterSSA_x$1, `final`);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
const a = $( 1 );
if (a) {
  const b = $( 2, "branch" );
  const c = $( b, "arrow" );
  $( c, "result" );
}
const d = $( 3, "after" );
$( d, "final" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2, 'branch'
 - 4: 2, 'arrow'
 - 5: 2, 'result'
 - 6: 3, 'after'
 - 7: 3, 'final'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
