# Preval test case

# auto_ident_call_ident_complex_args.md

> Normalize > Expressions > Assignments > Switch default > Auto ident call ident complex args
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    a = $($(1), $(2));
}
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (true) {
    a = $($(1), $(2));
  } else {
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
const tmpCallCallee = $;
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
a = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Output

`````js filename=intro
$(1);
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
const a = $(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 1, 2
 - 5: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
