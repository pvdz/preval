# Preval test case

# try_entry1.md

> Ref tracking > Done > Try-random > Try entry1
>
> The entryReads and entryWrites for a Try must be propagated which is relevant for loops.

## Options

- refTest

## Input

`````js filename=intro
{
  let x = 1;
  $(x); // x=1
  while (true) {
    x = 2;
    try {
      $(x);
      x = 3; // Does not overwrite itself
    } catch {
      $(x);
    }
  }
  $(x); // unreachable
}
`````


## Output

(Annotated with pids)

`````filename=intro
/* stmt(3): */ let /*___4__*/ x = 1;
/* stmt(6): */ $(/*___9__*/ x);
/* stmt(10): */ while (true) {
  /*12~33*/ /* stmt(13): */ /*___16__*/ x = 2;
  /* stmt(17): */ try /*18~26*/ {
    /* stmt(19): */ $(/*___22__*/ x);
    /* stmt(23): */ /*___26__*/ x = 3;
  } catch (/*___28__*/ e) /*29~33*/ {
    /* stmt(30): */ $(/*___33__*/ x);
  }
}
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9           | none           | 16
  - r @9       | 4
  - w @16      | ########## | 22,33       | 4,16,26        | 16,26
  - r @22      | 16
  - w @26      | ########## | 33          | 16             | 16
  - r @33      | 16,26

e:
  - w @28      | ########## | not read    | none           | none
