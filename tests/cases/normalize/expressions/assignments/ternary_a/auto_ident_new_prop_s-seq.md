# Preval test case

# auto_ident_new_prop_s-seq.md

> Normalize > Expressions > Assignments > Ternary a > Auto ident new prop s-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$((a = new (1, 2, b).$(1)) ? $(100) : $(200));
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $ };
let a = { a: 999, b: 1000 };
$((a = new (1, 2, b).$(1)) ? $(100) : $(200));
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpCompObj = b;
const tmpNewCallee = tmpCompObj.$;
a = new tmpNewCallee(1);
let tmpIfTest = a;
if (tmpIfTest) {
  tmpCalleeParam = $(100);
} else {
  tmpCalleeParam = $(200);
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const b = { $: $ };
let tmpCalleeParam = undefined;
const tmpNewCallee = b.$;
const SSA_a = new tmpNewCallee(1);
if (SSA_a) {
  tmpCalleeParam = $(100);
} else {
  tmpCalleeParam = $(200);
}
$(tmpCalleeParam);
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 100
 - 3: 100
 - 4: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
