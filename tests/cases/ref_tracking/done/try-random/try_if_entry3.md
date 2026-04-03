# Preval test case

# try_if_entry3.md

> Ref tracking > Done > Try-random > Try if entry3
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
    } catch {
      if ($) {
        $(x);
        x = 3; // Does not overwrite itself
      }
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
  /*12~37*/ /* stmt(13): */ /*___16__*/ x = 2;
  /* stmt(17): */ try /*18~22*/ {
    /* stmt(19): */ $(/*___22__*/ x);
  } catch (/*___24__*/ e) /*25~37*/ {
    /* stmt(26): */ if ($) {
      /*28~36*/ /* stmt(29): */ $(/*___32__*/ x);
      /* stmt(33): */ /*___36__*/ x = 3;
    } /*37~37*/ else {
    }
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
  - w @16      | ########## | 22,32       | 4,16,36        | 16,36
  - r @22      | 16
  - r @32      | 16
  - w @36      | ########## | not read    | 16             | 16

e:
  - w @24      | ########## | not read    | none           | none
