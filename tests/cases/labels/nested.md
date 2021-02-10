# Preval test case

# nested.md

> labels > nested
>
> Labels should not throw

#TODO

## Input

`````js filename=intro
a: b: c: break a;
`````

## Normalized

`````js filename=intro
a: {
  b: {
    c: {
      break a;
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
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
