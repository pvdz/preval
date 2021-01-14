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
  {
    {
      break a;
    }
  }
}
`````

## Uniformed

`````js filename=intro
x: {
  {
    {
      break x;
    }
  }
}
`````

## Output

`````js filename=intro
a: {
  {
    {
      break a;
    }
  }
}
`````
