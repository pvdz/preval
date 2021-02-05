# Preval test case

# auto_ident_opt_call_simple.md

> normalize > expressions > statement > for_a > auto_ident_opt_call_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for ($?.(1); $(0); );
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  const tmpChainRootCall = $;
  if (tmpChainRootCall) {
    const tmpChainElementCall = tmpChainRootCall(1);
  }
  while (true) {
    const tmpIfTest = $(0);
    if (tmpIfTest) {
    } else {
      break;
    }
  }
}
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpChainRootCall = $;
if (tmpChainRootCall) {
  tmpChainRootCall(1);
}
while (true) {
  const tmpIfTest = $(0);
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 0
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
