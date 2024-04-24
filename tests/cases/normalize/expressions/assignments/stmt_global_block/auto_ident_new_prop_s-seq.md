# Preval test case

# auto_ident_new_prop_s-seq.md

> Normalize > Expressions > Assignments > Stmt global block > Auto ident new prop s-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let b = { $ };

  let a = { a: 999, b: 1000 };
  a = new (1, 2, b).$(1);
  $(a);
}
`````

## Pre Normal

`````js filename=intro
{
  let b = { $: $ };
  let a = { a: 999, b: 1000 };
  a = new (1, 2, b).$(1);
  $(a);
}
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCompObj = b;
const tmpNewCallee = tmpCompObj.$;
a = new tmpNewCallee(1);
$(a);
`````

## Output

`````js filename=intro
const tmpSSA_a = new $(1);
$(tmpSSA_a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = new $( 1 );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
