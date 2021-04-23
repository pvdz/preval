# Preval test case

# auto_ident_new_ident_complex_args.md

> Normalize > Expressions > Assignments > Logic and left > Auto ident new ident complex args
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$((a = new $($(1), $(2))) && $(100));
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
$((a = new $($(1), $(2))) && $(100));
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpNewCallee = $;
const tmpCalleeParam$1 = $(1);
const tmpCalleeParam$3 = $(2);
a = new tmpNewCallee(tmpCalleeParam$1, tmpCalleeParam$3);
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  tmpCalleeParam = $(100);
} else {
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const tmpCalleeParam$1 = $(1);
const tmpCalleeParam$3 = $(2);
const a = new $(tmpCalleeParam$1, tmpCalleeParam$3);
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  tmpCalleeParam = $(100);
} else {
}
$(tmpCalleeParam);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1, 2
 - 4: 100
 - 5: 100
 - 6: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
