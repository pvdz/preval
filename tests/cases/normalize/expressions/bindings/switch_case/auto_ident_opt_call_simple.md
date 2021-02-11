# Preval test case

# auto_ident_opt_call_simple.md

> normalize > expressions > bindings > switch_case > auto_ident_opt_call_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let a = $?.(1);
    $(a);
}
`````

## Normalized

`````js filename=intro
{
  let a;
  let tmpChainRootCall;
  {
    let tmpFallthrough = false;
    let tmpIfTest = tmpFallthrough;
    if (tmpIfTest) {
    } else {
      tmpIfTest = 1 === 1;
    }
    if (tmpIfTest) {
      {
        a = undefined;
        tmpChainRootCall = $;
        if (tmpChainRootCall) {
          const tmpChainElementCall = tmpChainRootCall(1);
          a = tmpChainElementCall;
        }
        $(a);
      }
      tmpFallthrough = true;
    }
  }
}
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
