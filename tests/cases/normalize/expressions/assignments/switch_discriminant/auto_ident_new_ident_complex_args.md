# Preval test case

# auto_ident_new_ident_complex_args.md

> Normalize > Expressions > Assignments > Switch discriminant > Auto ident new ident complex args
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
switch ((a = new $($(1), $(2)))) {
  default:
    $(100);
}
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = (a = new $($(1), $(2)));
  if (true) {
    $(100);
  } else {
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpNewCallee = $;
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
a = new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
let tmpSwitchDisc = a;
$(100);
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
const a = new $(tmpCalleeParam, tmpCalleeParam$1);
$(100);
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
const c = new $( a, b );
$( 100 );
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1, 2
 - 4: 100
 - 5: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
