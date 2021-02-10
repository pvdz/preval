# Preval test case

# auto_ident_new_computed_c-seq_simple.md

> normalize > expressions > assignments > for_of_right > auto_ident_new_computed_c-seq_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
for (let x of (a = new (1, 2, $(b))["$"](1)));
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
{
  let tmpForOfDeclRhs;
  const tmpCompObj = $(b);
  const tmpNewCallee = tmpCompObj.$;
  const tmpNestedComplexRhs = new tmpNewCallee(1);
  a = tmpNestedComplexRhs;
  tmpForOfDeclRhs = tmpNestedComplexRhs;
  let x;
  for (x of tmpForOfDeclRhs) {
  }
}
$(a);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: 1
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
