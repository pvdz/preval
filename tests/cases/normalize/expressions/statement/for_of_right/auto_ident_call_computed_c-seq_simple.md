# Preval test case

# auto_ident_call_computed_c-seq_simple.md

> normalize > expressions > statement > for_of_right > auto_ident_call_computed_c-seq_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
for (let x of (1, 2, $(b))["$"](1));
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
{
  1;
  2;
  const tmpCallObj = $(b);
  const tmpForOfDeclRhs = tmpCallObj['$'](1);
  let x;
  for (x of tmpForOfDeclRhs) {
  }
}
$(a);
`````

## Output

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallObj = $(b);
const tmpForOfDeclRhs = tmpCallObj.$(1);
let x;
for (x of tmpForOfDeclRhs) {
}
$(a);
`````

## Result

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: 1
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
