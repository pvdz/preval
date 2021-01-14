# Preval test case

# break_block.md

> labels > break_block
>
> Labels should not throw

#TODO

## Input

`````js filename=intro
foo: {


  break foo;
}
`````

## Normalized

`````js filename=intro
foo: {
  break foo;
}
`````

## Uniformed

`````js filename=intro
x: {
  break x;
}
`````

## Output

`````js filename=intro
foo: {
  break foo;
}
`````
